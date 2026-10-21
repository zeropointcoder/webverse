"""Initial staff schema

Revision ID: 18132d9f35f1
Revises: 
Create Date: 2026-10-14 08:57:31.408451

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = '18132d9f35f1'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "staff",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("first_name", sa.String(), nullable=False),
        sa.Column("last_name", sa.String(), nullable=False),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("phone", sa.String(), nullable=False),
        sa.Column("role", sa.String(), nullable=False),
        sa.Column("department", sa.String(), nullable=False),
        sa.Column("hire_date", sa.Date(), nullable=False),
        sa.Column("active", sa.Boolean(), nullable=True),
        sa.UniqueConstraint("email", name="uq_staff_email"),
    )
    op.create_index("ix_staff_id", "staff", ["id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_staff_id", table_name="staff")
    op.drop_table("staff")