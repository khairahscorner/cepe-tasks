#!/usr/bin/env bash
# This file tags and uploads images individually to Docker Hub or just use docker compose push??

# Assumes that an image is built via running the docker-compose file: docker compose build

# Step 1:
# Create dockerpath
dockerpath=khairahscorner/arm_task

# Step 2:  
# Authenticate & tag
echo "Docker ID and Image: $dockerpath"
docker login
docker image tag fibonacci-api:modified $dockerpath:go
docker image tag node-api:v1 $dockerpath:node

# Step 3:
# Push image to a docker repository
docker image push $dockerpath:node
docker image push $dockerpath:go
