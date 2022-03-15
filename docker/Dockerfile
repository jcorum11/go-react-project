FROM amazonlinux:2

RUN yum -y upgrade

RUN yum -y install wget httpd24 mod_ssl git zip gcc glibc glibc-common gd gd-devel make xz openssl11 nano

# https://stackoverflow.com/a/64309893/1248889
RUN openssl11 rand -out /root/.rnd -hex 256
RUN openssl11 req -newkey rsa:2048 \
	-keyout /etc/pki/tls/private/localhost.key \
	-nodes -x509 -days 365 \
	-out /etc/pki/tls/certs/localhost.crt \
	-subj "/C=US/ST=Utah/L=Orem/O=GoReact/CN=localhost" \
	-addext "subjectAltName = DNS:localhost,IP:127.0.0.1" \
	-addext "extendedKeyUsage = serverAuth"

# PHP 8.0
RUN amazon-linux-extras enable php8.0
RUN yum clean metadata
RUN yum -y install php php-{pear,pecel-xdebug,process,cgi,common,curl,mbstring,gd,mysqlnd,gettext,bcmath,json,xml,fpm,intl,zip,imap,xdebug,devel,pdo,pgsql}

# Install xdebug and remove stupid "could not connect to client" popping up all the time
RUN pecl install xdebug

RUN cd /root && wget https://getcomposer.org/installer && php installer --install-dir=/usr/local/bin --filename=composer && rm -f installer
RUN mkdir -p /var/run/php/cache && chown apache:apache /var/run/php/cache

RUN cd /tmp && wget https://sw-deploy-files.s3.amazonaws.com/ffmpeg.xz && wget https://sw-deploy-files.s3.amazonaws.com/ffprobe.xz && xz -d ffmpeg.xz && xz -d ffprobe.xz && mv ffmpeg ffprobe /usr/bin/ && chmod 0755 /usr/bin/ffmpeg /usr/bin/ffprobe

COPY percona.repo /etc/yum.repos.d/
RUN cd /etc/pki/rpm-gpg && wget -q https://repo.percona.com/yum/PERCONA-PACKAGING-KEY && wget -q https://www.percona.com/downloads/RPM-GPG-KEY-percona
RUN yum -y install percona-toolkit

RUN sed -i 's/zend.assertions = -1/zend.assertions = 1/g' /etc/php.ini
COPY xdebug.ini /etc/php.d/40-xdebug.ini
RUN touch /etc/php.d/xdebug.log

RUN mkdir -p /www/web && rmdir /var/www/html && ln -s /www/web/public /var/www/html
RUN chown apache:apache -R /www

COPY httpd.conf /etc/httpd/conf/

COPY docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT [ "docker-entrypoint.sh", "httpd" ]
