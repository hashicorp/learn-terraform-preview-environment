variable "environment_tag" {
  description = "Environment tag"
  default     = "Learn"
}

variable "region" {
  description = "The region Terraform deploys your instance"
  default     = "us-east-2"
}

variable "is_prod" {
  description = "The region Terraform deploys your instance"
  default     = false
}

variable "vercel_project" {
  description = "Vercel project ID"
  default     = "prj_"
}