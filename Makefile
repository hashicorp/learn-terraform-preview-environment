VERSION=v0.0.8
REPOSITORY=hashicorpdemoapp/frontend

build_docker:
	docker build -t ${REPOSITORY}:${VERSION} .