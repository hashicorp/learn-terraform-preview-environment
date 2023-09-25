# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: MPL-2.0

variable "environment_tag" {
  description = "Environment tag"
  default     = "Learn"
}

variable "region" {
  description = "The region Terraform deploys your instance"
  default     = "us-east-2"
}

variable "is_prod" {
  description = "If false, deploys preview environment EC2 and LB"
  default     = false
}