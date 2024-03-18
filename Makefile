run-dev:
	docker-compose -f docker-compose-dev.yaml exec -it server sh

run:
	docker-compose exec -it server sh

build-dev:
	docker-compose -f docker-compose-dev.yaml build

build:
	docker-compose build

up-dev:
	docker-compose -f docker-compose-dev.yaml up -d

up:
	docker-compose up -d

down: 
	docker-compose down