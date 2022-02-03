provider "aws" {
  region = var.region
}

data "terraform_remote_state" "network" {
  backend = "remote"

  config = {
    organization = "hashicorp-training"
    workspaces = {
      name = "hcup-be-network"
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
  template = file("setup-hashicups.yaml")
}

resource "aws_instance" "hashicups-backend" {
  count = var.is_prod ? 0 : 1
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t2.micro"
  subnet_id                   = data.terraform_remote_state.network.outputs.public_subnets[0]
  vpc_security_group_ids      = [data.terraform_remote_state.network.outputs.hashicups_security_group_id]
  associate_public_ip_address = true
  user_data                   = data.template_file.user_data.rendered

  tags = {
    Name = terraform.workspace
  }
}