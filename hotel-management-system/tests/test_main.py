from app.models import Staff

from unittest.mock import patch
from sqlalchemy.exc import SQLAlchemyError


def test_health_check(client):
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_create_staff(client, cleanup_staff, db_session):
    staff_data = {
        "first_name": "Test",
        "last_name": "Employee",
        "email": "test.employee.project1@example.com",
        "phone": "07700900123",
        "role": "Receptionist",
        "department": "Front Office",
        "hire_date": "2025-03-10",
        "active": True
    }

    cleanup_staff.append(staff_data["email"])

    response = client.post("/staff/", json=staff_data)

    assert response.status_code == 200

    created_staff = response.json()

    assert created_staff["first_name"] == "Test"
    assert created_staff["last_name"] == "Employee"
    assert created_staff["email"] == staff_data["email"]

    saved_staff = (
        db_session.query(Staff)
        .filter(Staff.email == staff_data["email"])
        .first()
    )

    assert saved_staff is not None
    assert saved_staff.first_name == "Test"


def test_get_staff(client):
    response = client.get("/staff/")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_staff_by_id(client, db_session, cleanup_staff):
    staff_data = {
        "first_name": "Find",
        "last_name": "Employee",
        "email": "find.employee.project1@example.com",
        "phone": "07700900124",
        "role": "Manager",
        "department": "Front Office",
        "hire_date": "2025-04-15",
        "active": True,
    }

    cleanup_staff.append(staff_data["email"])

    create_response = client.post("/staff/", json=staff_data)
    assert create_response.status_code == 200

    staff_id = create_response.json()["id"]

    response = client.get(f"/staff/{staff_id}")

    assert response.status_code == 200
    assert response.json()["id"] == staff_id
    assert response.json()["email"] == staff_data["email"]


def test_update_staff(client, db_session, cleanup_staff):
    staff_data = {
        "first_name": "Update",
        "last_name": "Employee",
        "email": "update.employee.project1@example.com",
        "phone": "07700900125",
        "role": "Receptionist",
        "department": "Front Office",
        "hire_date": "2025-05-20",
        "active": True,
    }

    cleanup_staff.append(staff_data["email"])

    create_response = client.post("/staff/", json=staff_data)

    assert create_response.status_code == 200

    staff_id = create_response.json()["id"]

    updated_staff = {
        **staff_data,
        "role": "Front Office Manager",
        "department": "Management",
    }

    response = client.put(f"/staff/{staff_id}", json=updated_staff)

    assert response.status_code == 200
    assert response.json()["role"] == updated_staff["role"]
    assert response.json()["department"] == updated_staff["department"]


def test_delete_staff(client, db_session, cleanup_staff):
    staff_data = {
        "first_name": "Delete",
        "last_name": "Employee",
        "email": "delete.employee.project1@example.com",
        "phone": "07700900126",
        "role": "Receptionist",
        "department": "Front Office",
        "hire_date": "2025-06-10",
        "active": True,
    }

    cleanup_staff.append(staff_data["email"])

    create_response = client.post("/staff/", json=staff_data)
    assert create_response.status_code == 200

    staff_id = create_response.json()["id"]

    response = client.delete(f"/staff/{staff_id}")

    assert response.status_code == 200
    assert response.json()["message"] == "Staff member deleted successfully"

    deleted_staff = (
        db_session.query(Staff)
        .filter(Staff.id == staff_id)
        .first()
    )

    assert deleted_staff is None


def test_staff_not_found(client):
    response = client.get("/staff/999999999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Staff member not found"


def test_update_staff_not_found(client):
    response = client.put(
        "/staff/999999999",
        json={
            "first_name": "Test",
            "last_name": "Employee",
            "email": "missing.employee@example.com",
            "phone": "07123456789",
            "role": "Receptionist",
            "department": "Front Office",
            "hire_date": "2025-01-15",
            "active": True,
        }
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Staff member not found"


def test_delete_staff_not_found(client):
    response = client.delete("/staff/999999999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Staff member not found"


def test_create_duplicate_email(client, cleanup_staff):
    staff_data = {
        "first_name": "Test",
        "last_name": "Employee",
        "email": "duplicate.project1@example.com",
        "phone": "07123456789",
        "role": "Receptionist",
        "department": "Front Office",
        "hire_date": "2025-01-15",
        "active": True,
    }

    cleanup_staff.append(staff_data["email"])

    first_response = client.post("/staff/", json=staff_data)

    assert first_response.status_code == 200

    second_response = client.post("/staff/", json=staff_data)

    assert second_response.status_code == 409
    assert second_response.json()["detail"] == "Email already in use"


def test_create_staff_invalid_hire_date(client):
    staff_data = {
        "first_name": "Test",
        "last_name": "Employee",
        "email": "invalid.date.project1@example.com",
        "phone": "07123456789",
        "role": "Receptionist",
        "department": "Front Office",
        "hire_date": "not-a-date",
        "active": True,
    }

    response = client.post("/staff/", json=staff_data)

    assert response.status_code == 422


def test_create_staff_empty_first_name(client):
    staff_data = {
        "first_name": " ",
        "last_name": "Employee",
        "email": "empty.name.project1@example.com",
        "phone": "07123456789",
        "role": "Receptionist",
        "department": "Front Office",
        "hire_date": "2025-01-15",
        "active": True,
    }

    response = client.post("/staff/", json=staff_data)

    assert response.status_code == 422


def test_create_staff_invalid_email(client):
    staff_data = {
        "first_name": "Test",
        "last_name": "Employee",
        "email": "not-an-email",
        "phone": "07123456789",
        "role": "Receptionist",
        "department": "Front Office",
        "hire_date": "2025-01-15",
        "active": True,
    }

    response = client.post("/staff/", json=staff_data)

    assert response.status_code == 422


def test_create_staff_wrong_first_name_type(client):
    staff_data = {
        "first_name": 123,
        "last_name": "Employee",
        "email": "wrong.type.project1@example.com",
        "phone": "07123456789",
        "role": "Receptionist",
        "department": "Front Office",
        "hire_date": "2025-01-15",
        "active": True,
    }

    response = client.post("/staff/", json=staff_data)

    assert response.status_code == 422


def test_get_staff_database_error(client):
    with patch(
        "app.routers.staff.Session.query",
        side_effect=SQLAlchemyError("Simulated database failure")
    ):
        response = client.get("/staff/")

    assert response.status_code == 500
    assert response.json() == {
        "detail": "An unexpected database error occurred"
    }


def test_get_staff_by_id_database_error(client):
    with patch(
        "app.routers.staff.Session.query",
        side_effect=SQLAlchemyError("Simulated database failure")
    ):
        response = client.get("/staff/1")

    assert response.status_code == 500
    assert response.json()["detail"] == "An unexpected database error occurred"


def test_create_staff_database_error(client):
    staff_data = {
        "first_name": "Test",
        "last_name": "Employee",
        "email": "test.employee.database.error@example.com",
        "phone": "1234567890",
        "role": "Receptionist",
        "department": "Front Desk",
        "hire_date": "2025-01-15",
        "active": True,
    }

    with patch(
        "app.routers.staff.Session.query",
        side_effect=SQLAlchemyError("Simulated database failure"),
    ):
        response = client.post("/staff/", json=staff_data)

    assert response.status_code == 500
    assert response.json()["detail"] == (
        "An unexpected database error occurred"
    )


def test_update_staff_database_error(client, cleanup_staff):
    staff_data = {
        "first_name": "Test",
        "last_name": "Employee",
        "email": "test.employee.update.error@example.com",
        "phone": "1234567890",
        "role": "Receptionist",
        "department": "Front Desk",
        "hire_date": "2025-01-15",
        "active": True,
    }

    cleanup_staff.append(staff_data["email"])

    create_response = client.post("/staff/", json=staff_data)
    assert create_response.status_code == 200

    staff_id = create_response.json()["id"]

    updated_data = {
        **staff_data,
        "first_name": "updated"
    }

    with patch(
        "app.routers.staff.Session.query",
        side_effect=SQLAlchemyError("Simulated database failure"),
    ):
        response = client.put(
            f"/staff/{staff_id}",
            json=updated_data,
        )

    assert response.status_code == 500
    assert response.json()["detail"] == (
        "An unexpected database error occurred"
    )


def test_delete_staff_database_error(client, cleanup_staff):
    staff_data = {
        "first_name": "Test",
        "last_name": "Employee",
        "email": "test.employee.delete.error@example.com",
        "phone": "1234567890",
        "role": "Receptionist",
        "department": "Front Desk",
        "hire_date": "2025-01-15",
        "active": True,
    }

    cleanup_staff.append(staff_data["email"])

    create_response = client.post("/staff/", json=staff_data)
    assert create_response.status_code == 200

    staff_id = create_response.json()["id"]

    with patch(
        "app.routers.staff.Session.query",
        side_effect=SQLAlchemyError("Simulated database failure")
    ):
        response = client.delete(f"/staff/{staff_id}")

    assert response.status_code == 500
    assert response.json()["detail"] == (
        "An unexpected database error occurred"
    )