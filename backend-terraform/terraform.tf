terraform {
  cloud {
    hostname = "app.terraform.io"
    organization = "hashicorp-training"
    workspaces {
      tags = ["hashicupsBackend"]
    }
  }

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "0.0.1-alpha"
    }
  }
}
