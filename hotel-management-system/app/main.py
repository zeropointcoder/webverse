from fastapi import FastAPI
from prometheus_fastapi_instrumentator import Instrumentator

from app.routers import staff


app = FastAPI(title="Hotel Management System")

app.include_router(staff.router)


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy"}


Instrumentator().instrument(app).expose(app, endpoint="/metrics")