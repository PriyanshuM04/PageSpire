from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users
from exceptions import AppError, app_error_handler, unhandled_error_handler
from database import Base, engine
import models.user

app = FastAPI(title="PageSpire")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.add_exception_handler(AppError, app_error_handler)
app.add_exception_handler(Exception, unhandled_error_handler)

app.include_router(users.router)