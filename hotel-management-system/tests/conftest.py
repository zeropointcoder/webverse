import os

os.environ["DATABASE_URL"] = (
    "postgresql+psycopg2://leo@localhost/hotel_management_test"
)

import pytest

from app.database import SessionLocal
from fastapi.testclient import TestClient
from app.database import get_db
from app.main import app
from app.models import Staff


@pytest.fixture
def db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.rollback()
        db.close()


@pytest.fixture
def client(db_session):
    def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()


@pytest.fixture
def cleanup_staff(db_session):
    created_emails = []

    yield created_emails

    for email in created_emails:
        staff_member = (
            db_session.query(Staff)
            .filter(Staff.email == email)
            .first()
        )

        if staff_member is not None:
            db_session.delete(staff_member)

    db_session.commit()