```bash
#!/usr/bin/env bash
set -euo pipefail

: "${MASTER_SECRET_ARN:?Set MASTER_SECRET_ARN}"
: "${APP_SECRET_ARN:?Set APP_SECRET_ARN}"
AWS_REGION="${AWS_REGION:-eu-west-2}"

command -v aws >/dev/null
command -v jq >/dev/null
command -v psql >/dev/null

master_secret=$(aws secretsmanager get-secret-value \
  --secret-id "$MASTER_SECRET_ARN" \
  --region "$AWS_REGION" \
  --query SecretString --output text)

app_secret=$(aws secretsmanager get-secret-value \
  --secret-id "$APP_SECRET_ARN" \
  --region "$AWS_REGION" \
  --query SecretString --output text)

master_user=$(jq -er '.username' <<< "$master_secret")
master_password=$(jq -er '.password' <<< "$master_secret")
db_host=$(jq -er '.host' <<< "$app_secret")
db_name=$(jq -er '.dbname' <<< "$app_secret")
db_port=$(jq -er '.port' <<< "$app_secret")
app_user=$(jq -er '.username' <<< "$app_secret")
app_password=$(jq -er '.password' <<< "$app_secret")

export PGPASSWORD="$master_password"

psql "host=$db_host port=$db_port dbname=$db_name user=$master_user sslmode=require" \
  -v ON_ERROR_STOP=1 \
  -v app_user="$app_user" \
  -v app_password="$app_password" \
  -v db_name="$db_name" <<'SQL'
SELECT format('CREATE ROLE %I LOGIN PASSWORD %L', :'app_user', :'app_password')
WHERE NOT EXISTS (
  SELECT 1 FROM pg_roles WHERE rolname = :'app_user'
)
\gexec

SELECT format('ALTER ROLE %I WITH LOGIN PASSWORD %L', :'app_user', :'app_password')
\gexec

SELECT format('GRANT CONNECT ON DATABASE %I TO %I', :'db_name', :'app_user')
\gexec

GRANT USAGE, CREATE ON SCHEMA public TO :"app_user";
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO :"app_user";
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO :"app_user";

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO :"app_user";

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO :"app_user";
SQL

unset PGPASSWORD master_password app_password master_secret app_secret
echo "Application database user bootstrap completed."
```