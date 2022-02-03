provider "vercel" {}
    
locals {
  is_prod = length(regexall(".*hcup.*", terraform.workspace)) == 0
}

data "vercel_project_directory" "frontend" {
  path = "./.."
}

resource "vercel_deployment" "frontend" {
  project_id = "prj_"
  files = data.vercel_project_directory.frontend.files
  production = local.is_prod
  environment = {
    REACT_APP_PUBLIC_API_URL = local.is_prod ? "" : "https://${aws_lb.app.dns_name}"
  }
}

output "preview_url" {
  value = vercel_deployment.frontend.url
}