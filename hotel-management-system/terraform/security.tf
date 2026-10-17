# Firewall for the FastAPI application
resource "aws_security_group" "app" {
  name        = "hotel-management-app-sg"
  description = "Allow HTTP API traffic to the Hotel Management System"
  vpc_id      = aws_vpc.hotel.id

  ingress {
    description = "FastAPI application access"
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow outbound connections"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "hotel-management-app-sg"
    Project = "hotel-management-system"
  }
}

# Firewall for the PostgreSQL database
resource "aws_security_group" "database" {
  name        = "hotel-management-db-sg"
  description = "Allow PostgreSQL only from the application"
  vpc_id      = aws_vpc.hotel.id

  ingress {
    description     = "PostgreSQL from the application server"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
  }

  egress {
    description = "Allow outbound connections"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "hotel-management-db-sg"
    Project = "hotel-management-system"
  }
}