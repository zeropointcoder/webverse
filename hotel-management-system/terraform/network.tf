# Private network for the Hotel Management System
resource "aws_vpc" "hotel" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name    = "hotel-management-vpc"
    Project = "hotel-management-system"
  }
}

# Internet gateway for resources in the public subnet
resource "aws_internet_gateway" "hotel" {
  vpc_id = aws_vpc.hotel.id

  tags = {
    Name    = "hotel-management-igw"
    Project = "hotel-management-system"
  }
}

# Public subnet for the application server
resource "aws_subnet" "app_public" {
  vpc_id                  = aws_vpc.hotel.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "eu-west-2a"
  map_public_ip_on_launch = true

  tags = {
    Name    = "hotel-management-public-subnet"
    Project = "hotel-management-system"
  }
}

# Route internet-bound traffic through the internet gateway
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.hotel.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.hotel.id
  }

  tags = {
    Name    = "hotel-management-public-routes"
    Project = "hotel-management-system"
  }
}

resource "aws_route_table_association" "app_public" {
  subnet_id      = aws_subnet.app_public.id
  route_table_id = aws_route_table.public.id
}

# Private subnets for the RDS database subnet group
# RDS will use these in two different Availability Zones
resource "aws_subnet" "db_private_a" {
  vpc_id            = aws_vpc.hotel.id
  cidr_block        = "10.0.10.0/24"
  availability_zone = "eu-west-2a"

  tags = {
    Name    = "hotel-management-db-private-a"
    Project = "hotel-management-system"
  }
}

resource "aws_subnet" "db_private_b" {
  vpc_id            = aws_vpc.hotel.id
  cidr_block        = "10.0.11.0/24"
  availability_zone = "eu-west-2b"

  tags = {
    Name    = "hotel-management-db-private-b"
    Project = "hotel-management-system"
  }
}