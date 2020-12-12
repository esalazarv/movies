# Movies managment system
A stack with Laravel and Vue

## Requirements

- Docker >= version 19.03.13, build 4484c46d9d
- Docker Compose >= 1.27.4, build 40524192 


### Instalation

Clone this repo

````bash
git clone https://github.com/esalazarv/movies.git
````

Configure the environment variables for build the containers

First at root directory copy de `.env.example` file into a `.env` file

````bash
cd movies
cp .env.example .env
````

Then configure de ENV vars as you need or keep the same if you are in development mode.
````dotenv
# The port to be exposed to host
DOCKER_APP_PORT=3000
# Docker environment (Only works for the vue SPA for now)
DOCKER_ENVIRONMENT=development

# Database configuration for container 
# The port to be exposed to host
DOCKER_DB_PORT=5432 
DOCKER_DB_USERNAME=admin
DOCKER_DB_PASSWORD=secret
DOCKER_DB_DATABASE=forge
````

Build an up all containers
````bash
docker-compose up --build -d
````

### Folder structure
This project keeps all services in the same repo but isolated in its own directories:

#### Nginx (Reverse proxy)
Directory `nginx`
 
#### Laravel project

Directory `api`

The laravel service is not optimized for production with docker multistage, 
then you must run some commands after up all containers

Copy the `.env` file
````
docker-compose exec php cp .env.example .env
````

Configure env vars if you change database credential in container build step.

Generate app key
````bash
docker-compose exec php php artisan key:generate
````

Run migrations
````bash
docker-compose exec php php artisan migrate
````

#### Vue (Require auth)
Directory `web`

This service is ready to work after container up


### Exposed Services

If you keep the same env vars this project will listen the next services:

##### Database

Listen on port 5432

##### Front

http://localhost:3000

- username: **admin@movies.com**
- password **secret**


##### Api
http://localhost:3000/api
 

