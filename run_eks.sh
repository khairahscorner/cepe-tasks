#!/usr/bin/env bash

# Script to Deploy to AWS EKS to access the apps externally via load balancer

# have an existing cluster and node group
clusterName=hashnode

# if cluster is new, configure kubectl to communicate with the cluster
aws eks update-kubeconfig --name $clusterName

#create a deployment and service with file configs (ensure docker compose build is ran and images are latest versions and already pushed to docker repo)
kubectl apply -f deployConfig.yml
kubectl apply -f serviceConfig.yml

# # run `run_aws_elb.sh` to create the aws elb ingress controller
# source ./run_aws_elb.sh $clusterName

# # create the ingress resource
# kubectl apply -f ingress.yml

kubectl get all 