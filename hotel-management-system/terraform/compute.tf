# Find a recent Amazon Linux 2023 image.
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Define the EC2 instance for the hotel application
resource "aws_instance" "hotel" {
  ami                         = data.aws_ami.amazon_linux.id
  instance_type               = var.ec2_instance_type
  subnet_id                   = aws_subnet.app_public.id
  vpc_security_group_ids      = [aws_security_group.app.id]
  iam_instance_profile        = aws_iam_instance_profile.ec2.name
  associate_public_ip_address = true

  user_data = <<-EOF
    #!/bin/bash
    set -euo pipefail

    dnf update -y
    dnf install -y docker jq awscli-2
    systemctl enable --now docker

    # Retrieve the application's database credentials.
    SECRET_JSON=$(aws secretsmanager get-secret-value \
      --secret-id "${aws_secretsmanager_secret.app_db.arn}" \
      --region "eu-west-2" \
      --query SecretString \
      --output text)

    DB_USERNAME=$(echo "$SECRET_JSON" | jq -r '.username')
    DB_PASSWORD=$(echo "$SECRET_JSON" | jq -r '.password')
    DB_HOST=$(echo "$SECRET_JSON" | jq -r '.host')
    DB_NAME=$(echo "$SECRET_JSON" | jq -r '.dbname')
    DB_PORT=$(echo "$SECRET_JSON" | jq -r '.port')

    # Write the connection string to a root-only environment file
    install -m 600 /dev/null /etc/hotel-management.env
    printf 'DATABASE_URL=postgresql+psycopg2://%s:%s@%s:%s/%s\n' \
      "$DB_USERNAME" "$DB_PASSWORD" "$DB_HOST" "$DB_PORT" "$DB_NAME" \
      > /etc/hotel-management.env

    unset SECRET_JSON DB_PASSWORD

    APP_IMAGE="zeropointcoder/hotel-management-system:1.0.1"

    docker pull "$APP_IMAGE"

    # Run database migrations before starting the API.
    docker run --rm \
      --env-file /etc/hotel-management.env \
      "$APP_IMAGE" \
      python -m alembic upgrade head

    # Start the API only if migrations succeed.
    docker run -d \
      --name hotel-management-api \
      --restart unless-stopped \
      -p 8000:8000 \
      --env-file /etc/hotel-management.env \
      "$APP_IMAGE"
  EOF

  tags = {
    Name    = "hotel-management-ec2"
    Project = "hotel-management-system"
  }
}