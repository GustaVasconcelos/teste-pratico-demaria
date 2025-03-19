#!/bin/bash

if [ ! -f .env ]; then
    echo "Arquivo .env não encontrado. Copiando .env.example para .env"
    cp .env.example .env
fi

composer install 

sleep 3

php artisan key:generate

php artisan jwt:secret

php artisan migrate

php artisan serve --host=0.0.0.0 --port=8000