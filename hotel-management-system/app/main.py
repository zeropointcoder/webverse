from fastapi import FastAPI

from app.routers import staff


app = FastAPI(title="Hotel Management System")

app.include_router(staff.router)


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy"}
