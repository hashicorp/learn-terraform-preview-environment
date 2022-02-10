output "lb_dns_name" {
  value = length(aws_lb.app) > 0 ? "https:://${aws_lb.app[0].dns_name}" : ""
}

output "public_ip" {
  value = length(aws_instance.hashicups-backend) > 0 ? "https:://${aws_instance.hashicups-backend[0].public_ip}" : ""
}

output "preview_url" {
  value = vercel_deployment.frontend.url
}