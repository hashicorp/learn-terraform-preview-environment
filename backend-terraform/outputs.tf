output "lb_dns_name" {
  value = aws_lb.app.dns_name
}

output "public_ip" {
  value = aws_instance.hashicups-backend.public_ip
}