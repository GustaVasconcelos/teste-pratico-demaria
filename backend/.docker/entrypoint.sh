#!/bin/bash

composer install

sleep 3
if [ ! -f .env ]; then
    echo "Arquivo .env não encontrado. Copiando .env.example para .env"
    cp .env.example .env
fi

php artisan jwt:secret

php artisan key:generate

exec "$@"
