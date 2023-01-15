# Deploy to AWS EKS 

# create a namespace if necessary
# kubectl create namespace python-apps

# if cluster is new, configure kubectl to communicate with the cluster
aws eks update-kubeconfig --name ml-api

#create a deployment and service with file configs (ensure docker compose build is ran and images are latest versions and already pushed to docker repo)
kubectl apply -f deployConfig.yml
kubectl apply -f serviceConfig.yml


kubectl get svc 