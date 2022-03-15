#!/bin/bash

rm -f /var/run/httpd/httpd.pid

cd /www/web

composer install

if [ ! -f .env ]; then
    cp .env.example .env
fi

# Link Storage for uploads
if [ ! -f public/storage ]; then
    php artisan storage:link
fi

# App key
php artisan key:generate

# Migrate
php artisan migrate

exec /usr/sbin/httpd -D FOREGROUND
