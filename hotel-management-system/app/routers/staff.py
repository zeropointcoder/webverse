from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Staff
from app.schemas import StaffCreate, StaffUpdate
from app.services.staff_service import commit_changes

router = APIRouter(
    prefix="/staff",
    tags=["Staff"]
)


@router.post("/")
def create_staff(staff: StaffCreate, db: Session = Depends(get_db)):
    try:
        existing_staff = (
            db.query(Staff)
            .filter(Staff.email == staff.email)
            .first()
        )

        if existing_staff is not None:
            raise HTTPException(
                status_code=409,
                detail="Email already in use"
            )

        new_staff = Staff(**staff.model_dump())

        db.add(new_staff)
        commit_changes(db)
        db.refresh(new_staff)

        return new_staff

    except HTTPException:
        raise

    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="An unexpected database error occurred"
        )


@router.get("/")
def get_staff(db: Session = Depends(get_db)):
    try:
        return db.query(Staff).all()

    except HTTPException:
        raise

    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="An unexpected database error occurred"
        )


@router.get("/{staff_id}")
def get_staff_by_id(staff_id: int, db: Session = Depends(get_db)):
    try:
        existing_staff = (
            db.query(Staff)
            .filter(Staff.id == staff_id)
            .first()
        )

        if existing_staff is None:
            raise HTTPException(
                status_code=404,
                detail="Staff member not found"
            )

        return existing_staff

    except HTTPException:
        raise

    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="An unexpected database error occurred"
        )


@router.put("/{staff_id}")
def update_staff(
    staff_id: int,
    staff: StaffUpdate,
    db: Session = Depends(get_db)
):
    try:
        existing_staff = (
            db.query(Staff)
            .filter(Staff.id == staff_id)
            .first()
        )

        if existing_staff is None:
            raise HTTPException(
                status_code=404,
                detail="Staff member not found"
            )

        for field, value in staff.model_dump().items():
            setattr(existing_staff, field, value)

        db.commit()
        db.refresh(existing_staff)

        return existing_staff

    except HTTPException:
        raise

    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="An unexpected database error occurred"
        )


@router.delete("/{staff_id}")
def delete_staff(staff_id: int, db: Session = Depends(get_db)):
    try:
        existing_staff = (
            db.query(Staff)
            .filter(Staff.id == staff_id)
            .first()
        )

        if existing_staff is None:
            raise HTTPException(
                status_code=404,
                detail="Staff member not found"
            )

        db.delete(existing_staff)
        db.commit()

        return {"message": "Staff member deleted successfully"}

    except HTTPException:
        raise

    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="An unexpected database error occurred"
        )