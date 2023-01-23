provider "aws" {
  region = var.region
}

data "terraform_remote_state" "shared" {
  backend = "remote"

  config = {
    organization = "vera-laseine-mortuna"
    workspaces = {
      name = "hcup-be-shared"
    }
  }
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-*20*-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

data "template_file" "user_data" {
  template = file("${path.module}/setup-hashicups.yaml")
}

resource "aws_instance" "hashicups-backend" {
  count                       = var.is_prod ? 0 : 1
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t2.micro"
  subnet_id                   = data.terraform_remote_state.shared.outputs.public_subnets[0]
  vpc_security_group_ids      = [data.terraform_remote_state.shared.outputs.hashicups_security_group_id]
  associate_public_ip_address = true
  user_data                   = data.template_file.user_data.rendered

  tags = {
    Name = terraform.workspace
  }
}

resource "aws_sqs_queue" "terraform_queue" {
  name                      = "terraform-example-queue"
  delay_seconds             = 90
  max_message_size          = 2048
  message_retention_seconds = 86400
  receive_wait_time_seconds = 10
  # redrive_policy = jsonencode({
  #   deadLetterTargetArn = aws_sqs_queue.terraform_queue_deadletter.arn
  #   maxReceiveCount     = 4
  # })

  tags = {
    Environment = "preview"
  }
}