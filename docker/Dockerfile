FROM docker/compose:1.29.2

WORKDIR /app

COPY . .

CMD ["docker-compose", "-f", "production/docker-compose.prod.yml", "up"]