from sqlalchemy import Boolean, Column, Date, Integer, String
from app.database import Base


class Staff(Base):
    __tablename__ = "staff"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=False)
    role = Column(String, nullable=False)
    department = Column(String, nullable=False)
    hire_date = Column(Date, nullable=False)
    active = Column(Boolean, default=True)