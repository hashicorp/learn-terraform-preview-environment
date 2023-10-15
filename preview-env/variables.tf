variable "environment_tag" {
  description = "Environment tag"
  default     = "Learn"
}

variable "region" {
  description = "The region Terraform deploys your instance"
  default     = "us-east-1"
}

variable "is_prod" {
  description = "If false, deploys preview environment EC2 and LB"
  default     = false
}