FROM php:7.4-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install --no-install-recommends -y \
        libwebp-dev \
        libjpeg-dev \
        libpng-dev \
        libpq-dev  \
        libzip-dev \
        unzip \
        zip \
        zlib1g-dev \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug

RUN docker-php-ext-configure gd --with-webp  --with-jpeg
RUN docker-php-ext-install \
    bcmath \
    ctype \
    gd \
    json \
    pcntl \
    pgsql \
    pdo_pgsql \
    sockets \
    zip

RUN curl --silent --show-error https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

CMD ["php-fpm"]
