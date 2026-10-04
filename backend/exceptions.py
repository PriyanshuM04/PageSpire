from fastapi import Request
from fastapi.responses import JSONResponse

class AppError(Exception):
    status_code = 400

    def __init__(self, message: str, field: str | None = None):
        self.message = message
        self.field = field

class NotFoundError(AppError):
    status_code=404

class ConflictError(AppError):
    status_code = 409

async def app_error_handler(request: Request, exc: AppError):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message, "field":exc.field},
    )

async def unhandled_error_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "field":None}
    )