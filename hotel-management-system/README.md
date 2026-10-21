# Hotel Management System

Staff management REST API built with FastAPI, PostgreSQL, and SQLAlchemy.

**Stack:** Python · FastAPI · PostgreSQL · Docker · Kubernetes · Terraform · Prometheus · Grafana

## Run Locally

```bash
docker compose up -d --build
```

- API documentation: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## Staff API

| Method | Endpoint | Action |
|---|---|---|
| `POST` | `/staff/` | Create staff member |
| `GET` | `/staff/` | List staff members |
| `GET` | `/staff/{staff_id}` | Retrieve staff member |
| `PUT` | `/staff/{staff_id}` | Update staff member |
| `DELETE` | `/staff/{staff_id}` | Delete staff member |

Use `/docs` to view request schemas and try the endpoints.

## Tests

```bash
python -m pytest -v
```

## Deployment & Monitoring

- [Kubernetes](k8s/README.md) — local deployment and EKS configuration.
- [Monitoring](monitoring/README.md) — Prometheus metrics and Grafana dashboard.

**Status:** Local Docker and Kubernetes setups tested. Terraform configured; AWS deployment not performed.