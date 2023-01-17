#!/usr/bin/env bash

# SET UP AWS load balancer ingress controller - first param $1 is the oidc_id, second is cluster name

serviceAccountName=aws-load-balancer-controller #should match name in createServiceAcc.yml

# check if oidc provider exists for the cluster
oidc_id=$(aws eks describe-cluster --name $1 --query "cluster.identity.oidc.issuer" --output text | cut -d '/' -f 5)
result=$(aws iam list-open-id-connect-providers | grep $oidc_id | cut -d "/" -f4)
if [ -z "$result" ]; then
    echo "no oidc"
    # create an oidc provider for the cluster
    eksctl utils associate-iam-oidc-provider --cluster $1 --approve
else
    echo "OIDC exists: $oidc_id"
fi

# download policy content and create IAM policy
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.4.4/docs/install/iam_policy.json
aws iam create-policy \
    --policy-name AWSLoadBalancerControllerIAMPolicy \
    --policy-document file://iam_policy.json

# policy content to create IAM role
cat >load-balancer-role-trust-policy.json <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::178472627685:oidc-provider/oidc.eks.us-east-1.amazonaws.com/id/833E440839A0AFBA84D0FC436B123FD9"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "oidc.eks.us-east-1.amazonaws.com/id/833E440839A0AFBA84D0FC436B123FD9:sub": "system:serviceaccount:kube-system:$serviceAccountName",
                    "oidc.eks.us-east-1.amazonaws.com/id/833E440839A0AFBA84D0FC436B123FD9:aud": "sts.amazonaws.com"
                }
            }
        }
    ]
}
EOF


aws iam create-role \
  --role-name AmazonEKSLoadBalancerControllerRole \
  --assume-role-policy-document file://"load-balancer-role-trust-policy.json"

# attached policy to role
aws iam attach-role-policy \
  --policy-arn arn:aws:iam::178472627685:policy/AWSLoadBalancerControllerIAMPolicy \
  --role-name AmazonEKSLoadBalancerControllerRole

# create the service account for the controller
kubectl apply -f createServiceAcc.yml

# install the AWS load balancer helm chart
helm repo add eks https://aws.github.io/eks-charts
helm repo update

# create the controller (service)
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=$2 \
  --set serviceAccount.create=false \
  --set serviceAccount.name=$serviceAccountName
  --set image.repository=602401143452.dkr.ecr.us-east-1.amazonaws.com/amazon/$serviceAccountName  #aws image repo for the region