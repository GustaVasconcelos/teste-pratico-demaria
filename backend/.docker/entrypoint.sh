#!/bin/bash

composer install

sleep 3

chown -R www-data:www-data /var/www
chmod -R 777 /var/www/storage /var/www/bootstrap/cache

if [ ! -f .env ]; then
    echo "Arquivo .env não encontrado. Copiando .env.example para .env"
    cp .env.example .env
fi

php artisan jwt:secret

php artisan key:generate

exec "$@"
