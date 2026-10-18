output "vpc_id" {
  description = "VPC ID for the Hotel Management System"
  value       = aws_vpc.hotel.id
}

output "public_subnet_id" {
  description = "Public subnet for the application server"
  value       = aws_subnet.app_public.id
}

output "ec2_public_ip" {
  description = "Public IP address of the hotel application EC2 instance"
  value       = aws_instance.hotel.public_ip
}