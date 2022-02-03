VERSION=v0.0.5
REPOSITORY=hasicorpdemoapp/frontend

build_docker:
	docker build -t ${REPOSITORY}:${VERSION} .