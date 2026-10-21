# Monitoring

## Local Setup

Start the monitoring stack from the project root:

```bash
docker compose up -d
```

- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000

In Grafana, configure Prometheus as a data source using `http://prometheus:9090`, then import `grafana/dashboards/hotel-api.json`.

The dashboard displays API requests, HTTP status codes, latency, CPU usage, and memory usage.

## AWS Monitoring

CloudWatch logging, metrics, and alarms are planned but not deployed. No AWS monitoring resources have been created.
