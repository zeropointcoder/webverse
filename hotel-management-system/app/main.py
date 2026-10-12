from fastapi import FastAPI

from app.database import Base, engine
from app.models import Staff
from app.routers import staff


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hotel Mangement System")

app.include_router(staff.router)


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy"}
