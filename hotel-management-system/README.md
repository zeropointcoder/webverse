# Hotel Management System

A staff management REST API built with Python, FastAPI, PostgreSQL, SQLAlchemy, and Pydantic.

## Features

- Create, list, retrieve, update, and delete staff members
- Request validation and error handling
- Automated tests with pytest
- Dockerised API and PostgreSQL database using Docker Compose

## Run with Docker Compose

From this directory:

```bash
docker compose up -d --build
```

API documentation: http://localhost:8000/docs

Health check: http://localhost:8000/health

Stop the services:

```bash
docker compose down
```

The PostgreSQL data is stored in a Docker named volume and persists when the services are stopped and restarted. Use `docker compose down -v` only when you intentionally want to remove that volume and its data.

## Run tests locally

Activate the project's Python environment, then run:

```bash
python3 -m pytest -v
```

The tests use the configured test database. Configure `DATABASE_URL` appropriately before running them.