from fastapi import APIRouter
from schemas.user import UserCreate

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", status_code=201)
def create_user(user: UserCreate):
    return user.model_dump(
        mode="json", 
        exclude={
            "password",
            "confirm_password"
        }
    )