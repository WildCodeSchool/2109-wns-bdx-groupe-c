#!/bin/sh
echo "Removing image" &&
docker image prune --force &&
echo "Removing volume" &&
docker volume prune --force &&
echo "Removing network" &&
docker network prune --force &&
echo "Removing container" &&
docker container prune --force &&
docker builder prune --keep-storage 2G --force &&
echo "Removing unnamed Docker volumes:" &&
docker volume rm $(docker volume ls -q | awk -F, 'length($0) == 64 { print }')