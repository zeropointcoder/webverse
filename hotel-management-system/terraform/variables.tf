variable "ec2_instance_type" {
  description = "EC2 instance type for the hotel application"
  type        = string
  default     = "t3.micro"
}

variable "db_instance_class" {
  description = "RDS instance class for the hotel database"
  type        = string
  default     = "db.t3.micro"
}

variable "db_name" {
  description = "Name of the hotel management database"
  type        = string
  default     = "hotel_management"
}

variable "db_username" {
  description = "Master username for the hotel RDS database"
  type        = string
  default     = "hotel_admin"
}

variable "enable_load_balancer" {
  description = "Whether to create the optional Application Load Balancer"
  type        = bool
  default     = false
}

variable "acm_certificate_arn" {
  description = "ARN of the ACM certificate for the application's domain"
  type        = string
  default     = ""
}

variable "db_app_username" {
  description = "Username for the hotel application's PostgreSQL account"
  type        = string
  default     = "hotel_app_user"
}