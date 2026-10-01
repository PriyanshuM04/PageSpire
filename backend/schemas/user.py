from datetime import date
from pydantic import (
    BaseModel, EmailStr, Field, HttpUrl, 
    field_validator, model_validator
)

class UserCreate(BaseModel):
    fullname: str = Field(
        min_length=2,
        max_length=80
    )
    username: str = Field(
        min_length=3,
        max_length=30,
        pattern=r"^[a-zA-Z0-9_]+$"
    )
    email: EmailStr
    phone: str = Field(
        pattern=r"^\d{10}$"
    )
    password: str = Field(
        min_length=8,
        max_length=64
    )
    confirm_password: str
    dob: date
    country: str = Field(
        min_length=2,
        max_length=56
    )
    social_link1: HttpUrl | None = None
    social_link2: HttpUrl | None = None
    social_link3: HttpUrl | None = None

    @field_validator("dob")
    @classmethod
    def dob_must_be_valid(cls, v: date) -> date:
        if v > date.today():
            raise ValueError("Date of Birth cannot be in future")
        return v

    @model_validator(mode="after")
    def passwords_must_match(self):
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self