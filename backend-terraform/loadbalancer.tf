resource "aws_lb" "app" {
  count = var.is_prod ? 0 : 1
  name               = terraform.workspace
  internal           = false
  load_balancer_type = "application"
  subnets            = data.terraform_remote_state.network.outputs.public_subnets
  security_groups    = [data.terraform_remote_state.network.outputs.hashicups_security_group_id]
}

resource "aws_lb_listener" "app" {
  count = var.is_prod ? 0 : 1
  load_balancer_arn = aws_lb.app[0].arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = data.terraform_remote_state.network.outputs.ssl_cert_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.hashicups-backend[0].arn
  }
}

resource "aws_lb_target_group" "hashicups-backend" {
  count = var.is_prod ? 0 : 1
  name     = terraform.workspace
  port     = 8080
  protocol = "HTTP"
  vpc_id   = data.terraform_remote_state.network.outputs.vpc_id

  health_check {
    port     = 8080
    protocol = "HTTP"
    timeout  = 5
    interval = 10
  }
}

resource "aws_lb_target_group_attachment" "hashicups-backend" {
  count = var.is_prod ? 0 : 1
  target_group_arn = aws_lb_target_group.hashicups-backend[0].arn
  target_id        = aws_instance.hashicups-backend[0].id
  port             = 8080
}