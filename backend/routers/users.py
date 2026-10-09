from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from schemas.user import UserCreate
from security import hash_password

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    data = user.model_dump(exclude={"password", "confirm_password"})
    for n in ("social_link_1", "social_link_2", "social_link_3"):
        if data.get(n) is not None:
            data[n] = str(data[n])
    db_user = User(**data, password_hash=hash_password(user.password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return {"id": db_user.id, **data}