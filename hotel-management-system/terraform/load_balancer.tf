resource "aws_lb" "hotel" {
  count = var.enable_load_balancer ? 1 : 0

  name               = "hotel-management-alb"
  internal           = false
  load_balancer_type = "application"

  security_groups = [
    aws_security_group.load_balancer[0].id
  ]

  subnets = [
    aws_subnet.app_public.id,
    aws_subnet.app_public_b.id
  ]

  tags = {
    Name    = "hotel-management-alb"
    Project = "hotel-management-system"
  }
}

resource "aws_lb_target_group" "hotel" {
  count = var.enable_load_balancer ? 1 : 0

  name     = "hotel-management-api-tg"
  port     = 8000
  protocol = "HTTP"
  vpc_id   = aws_vpc.hotel.id

  health_check {
    enabled             = true
    path                = "/health"
    protocol            = "HTTP"
    matcher             = "200"
    healthy_threshold   = 2
    unhealthy_threshold = 3
    interval            = 30
    timeout             = 5
  }

  tags = {
    Name    = "hotel-management-api-tg"
    Project = "hotel-management-system"
  }
}

resource "aws_lb_listener" "http" {
  count = var.enable_load_balancer ? 1 : 0

  load_balancer_arn = aws_lb.hotel[0].arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = var.acm_certificate_arn != "" ? "redirect" : "forward"

    dynamic "redirect" {
      for_each = var.acm_certificate_arn != "" ? [1] : []

      content {
        port        = "443"
        protocol    = "HTTPS"
        status_code = "HTTP_301"
      }
    }

    dynamic "forward" {
      for_each = var.acm_certificate_arn == "" ? [1] : []

      content {
        target_group {
          arn = aws_lb_target_group.hotel[0].arn
        }
      }
    }
  }
}

resource "aws_lb_listener" "https" {
  count = var.enable_load_balancer && var.acm_certificate_arn != "" ? 1 : 0

  load_balancer_arn = aws_lb.hotel[0].arn
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = var.acm_certificate_arn
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.hotel[0].arn
  }
}

resource "aws_lb_target_group_attachment" "hotel" {
  count = var.enable_load_balancer ? 1 : 0

  target_group_arn = aws_lb_target_group.hotel[0].arn
  target_id        = aws_instance.hotel.id
  port             = 8000
}