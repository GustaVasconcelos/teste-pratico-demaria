#!/bin/bash

if [ ! -f .env ]; then
    echo "Arquivo .env não encontrado. Copiando .env.example para .env"
    cp .env.example .env
fi

if [ ! -f .env ]; then
    echo "Arquivo .env não encontrado, criando com a chave"
    cp .env.example .env
fi

php artisan key:generate

php artisan jwt:secret

php artisan migrate

exec "$@"
