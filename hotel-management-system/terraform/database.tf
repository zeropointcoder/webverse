resource "aws_db_subnet_group" "hotel" {
  name        = "hotel-management-db-subnets"
  description = "Private subnets for the hotel database"

  subnet_ids = [
    aws_subnet.db_private_a.id,
    aws_subnet.db_private_b.id
  ]

  tags = {
    Name    = "hotel-management-db-subnets"
    Project = "hotel-management-system"
  }
}

resource "aws_db_instance" "hotel" {
  identifier = "hotel-management-db"

  engine         = "postgres"
  engine_version = "16.15"
  instance_class = var.db_instance_class

  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp3"
  storage_encrypted     = true

  # Database credentials are managed by AWS Secrets Manager.
  db_name                     = var.db_name
  username                    = var.db_username
  manage_master_user_password = true
  port                        = 5432

  # Keep the database private.
  db_subnet_group_name   = aws_db_subnet_group.hotel.name
  vpc_security_group_ids = [aws_security_group.database.id]
  publicly_accessible    = false

  # Backup and recovery settings.
  multi_az                = false
  backup_retention_period = 7
  copy_tags_to_snapshot   = true

  # Safer defaults for a production-style configuration.
  deletion_protection = true
  skip_final_snapshot = false

  tags = {
    Name    = "hotel-management-db"
    Project = "hotel-management-system"
  }
}

# Store the application's database credentials separately
# from the RDS master credentials.
resource "aws_secretsmanager_secret" "app_db" {
  name        = "hotel-management/app-database"
  description = "Database credentials for the Hotel Management System application"

  tags = {
    Project = "hotel-management-system"
  }
}

# Generate a strong password for the application database user
resource "random_password" "app_db" {
  length  = 32
  special = false
}

# Store the application database credentials in Secrets Manager.
resource "aws_secretsmanager_secret_version" "app_db" {
  secret_id = aws_secretsmanager_secret.app_db.id

  secret_string = jsonencode({
    username = var.db_app_username
    password = random_password.app_db.result
    engine   = "postgres"
    host     = aws_db_instance.hotel.address
    port     = 5432
    dbname   = var.db_name
  })
}