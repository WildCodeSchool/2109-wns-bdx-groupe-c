#!/bin/sh
# fetch-and-deploy.sh
docker-compose -f docker-compose.prod.yml pull && \
    GATEWAY_PORT=8000 docker-compose -f docker-compose.prod.yml up -d;
