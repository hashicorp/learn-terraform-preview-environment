data "vercel_project_directory" "frontend" {
  path = "."
}

locals {
  public_api_url = length(aws_lb.app) > 0 ? "https://${aws_lb.app[0].dns_name}" : ""
}

resource "vercel_deployment" "frontend" {
  project_id = data.terraform_remote_state.shared.outputs.vercel_project_id
  files      = data.vercel_project_directory.frontend.files
  production = var.is_prod
  environment = {
    NEXT_PUBLIC_PUBLIC_API_URL = var.is_prod ? "" : local.public_api_url
  }
}