data "vercel_project_directory" "frontend" {
  path = "."
}

resource "vercel_deployment" "frontend" {
  project_id = var.vercel_project
  files = data.vercel_project_directory.frontend.files
  production = var.is_prod
  environment = {
    REACT_APP_PUBLIC_API_URL = var.is_prod ? "" : "https://${aws_lb.app[0].dns_name}"
  }
}