variable "environment_tag" {
  description = "Environment tag"
  default     = "Learn"
}

variable "region" {
  description = "The region Terraform deploys your instance"
  default     = "us-east-2"
}

variable "vercel_project" {
  description = "Vercel project ID"
  default     = "prj_7pZSwBwD2DN7wPvQ9uJBsF9jsFlR"
}