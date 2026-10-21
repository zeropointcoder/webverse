from datetime import date

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class StaffCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    first_name: str = Field(min_length=1, strict=True)
    last_name: str = Field(min_length=1, strict=True)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=20, strict=True)
    role: str = Field(min_length=1, strict=True)
    department: str = Field(min_length=1, strict=True)
    hire_date: date
    active: bool = True


class StaffUpdate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    first_name: str = Field(min_length=1, strict=True)
    last_name: str = Field(min_length=1, strict=True)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=20, strict=True)
    role: str = Field(min_length=1, strict=True)
    department: str = Field(min_length=1, strict=True)
    hire_date: date
    active: bool