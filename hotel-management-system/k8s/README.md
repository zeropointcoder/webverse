# Kubernetes Deployment

This guide covers local Kubernetes deployment and validation of the EKS configuration.

Run all commands from the repository root: `hotel-management-system/`.

## Local Kubernetes
Deploy the resources in the order below. Do not apply the entire local overlay at once, because Kubernetes does not guarantee migration ordering.

### 1. Create the local Secret

```bash
kubectl create secret generic hotel-management-local-secrets \
  --from-literal=POSTGRES_USER='hotel_user' \
  --from-literal=POSTGRES_PASSWORD='local_dev_password' \
  --from-literal=DATABASE_URL='postgresql+psycopg2://hotel_user:local_dev_password@hotel-postgres:5432/hotel_management'
```

### 2. Deploy PostgreSQL

```bash
kubectl apply -f k8s/overlays/local/postgres.yaml
kubectl rollout status deployment/hotel-postgres --timeout=120s
```

### 3. Run database migrations

```bash
kubectl apply -f k8s/overlays/local/migration-job.yaml
kubectl wait --for=condition=complete job/hotel-db-migration --timeout=300s
```

### 4. Deploy the API

```bash
kubectl apply -f k8s/base/deployment.yaml
kubectl apply -f k8s/base/service.yaml
kubectl rollout status deployment/hotel-api --timeout=180s
```

### 5. Verify the API

```bash
kubectl port-forward service/hotel-api 8000:8000
```

In a second terminal:

```bash
curl -i http://localhost:8000/health
```

Expected response: HTTP `200 OK` with `{"status":"healthy"}`.

## EKS Configuration

The `k8s/overlays/eks/` overlay reuses the base Deployment and Service, sets two API replicas, and references the `hotel-management-eks-secrets` Secret.

Validate the rendered configuration without deploying:

```bash
kubectl kustomize k8s/overlays/eks
kubectl apply --dry-run=client -k k8s/overlays/eks
```

### EKS limitations

- The EKS overlay has been rendered and client-side dry-run validated; it has not been deployed.
- The `hotel-management-eks-secrets` Secret must be provisioned securely in the target cluster.
- The database endpoint, network connectivity, image availability, and production access configuration must be prepared before deployment.
- Production migrations, secret delivery, and deployment ordering must be integrated into the deployment workflow.
- No AWS resources have been created by these steps.

## Notes

- Local credentials are for development only. Never commit real secrets to Git.
- The local setup assumes the Secret and migration Job do not already exist.
- Production deployment requires environment-specific configuration and validation.