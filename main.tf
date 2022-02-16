terraform {
  cloud {
    hostname     = "app.terraform.io"
    organization = "ritsok"
    workspaces {
      tags = ["hashicupsBackend"]
    }
  }

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "0.2.0"
    }
  }
}

variable "is_prod" {
  description = "If false, deploys preview environment EC2 and LB"
  default     = false
}

module "preview-env" {
  source  = "./preview-env"
  is_prod = var.is_prod
}

output "lb_dns_name" {
  value = module.backend.lb_dns_name
}

output "preview_url" {
  value = module.backend.preview_url
}
