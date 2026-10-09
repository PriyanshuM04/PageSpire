from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from schemas.user import UserCreate
from security import hash_password

from sqlalchemy import or_, select
from sqlalchemy.exc import IntegrityError
from exceptions import ConflictError

router = APIRouter(prefix="/users", tags=["users"])

CONFLICT_MESSSAGES = {
    "username": "Username already taken",
    "email": "email already registered",
    "phone": "Phone number already registered"
}

@router.post("/", status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.execute(
        select(User).where(
            or_(
                User.username == user.username,
                User.email == user.email,
                User.phone == user.phone,
            )
        )
    ).scalars().all()

    for field, message in CONFLICT_MESSSAGES.items():
        if any(getattr(u, field) == getattr(user, field) for u in existing):
            raise ConflictError(message, field=field)

    data = user.model_dump(exclude={"password", "confirm_password"})
    for n in ("social_link_1", "social_link_2", "social_link_3"):
        if data.get(n) is not None:
            data[n] = str(data[n])
    
    db_user = User(**data, password_hash=hash_password(user.password))
    try:
        db.add(db_user)
        db.commit()
    except IntegrityError as e:
        db.rollback()
        field = next((f for f in CONFLICT_MESSSAGES if f in str(e.orig)), None)
        raise ConflictError(
            CONFLICT_MESSSAGES.get(field, "User already exists"), field=field
        )
    db.refresh(db_user)

    return {"id": db_user.id, **data}