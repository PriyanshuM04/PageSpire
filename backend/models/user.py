from datetime import date, datetime
from sqlalchemy import Date, DateTime, String, func
from sqlalchemy.orm import Mapped, mapped_column
from database import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    fullname: Mapped[str] = mapped_column(String(80))
    username: Mapped[str] = mapped_column(String(30), unique=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    phone: Mapped[str] = mapped_column(String(10), unique=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    dob: Mapped[date] = mapped_column(Date)
    country: Mapped[str] = mapped_column(String(56))
    social_link_1: Mapped[str | None] = mapped_column(String(255))
    social_link_2: Mapped[str | None] = mapped_column(String(255))
    social_link_3: Mapped[str | None] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())