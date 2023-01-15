# Deploy the two containerised apps to Kubernetes locally - minikube

#!/usr/bin/env bash

# Step 1:
minikube start

# alternatively, create the deployment and service with files that have been configured
kubectl apply -f deployConfig.yml
kubectl apply -f serviceConfig.yml

# # cannot use for more than one image, use yaml file for that
# kubectl create deployment v1 --image=$dockerimage
# kubectl expose deployment v1 --type=NodePort --port=3030

# Step 3:
# get name of pod (only useful if you have one pod)
export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
echo Name of the Pod: $POD_NAME

# replica in deploy file was set to just one pod, so this can be used to get pod name and forward for either 3000 or 8080
kubectl port-forward pod/$POD_NAME --address 0.0.0.0 3000:3000