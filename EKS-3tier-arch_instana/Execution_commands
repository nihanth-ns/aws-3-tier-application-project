# EKS 3-Tier Architecture - Execution Commands

## 🚀 CLUSTER CREATION

Create an EKS cluster with 2 EC2 instances as worker nodes using t3.medium instance type.

```bash
eksctl create cluster \
  --name demo-cluster \
  --region us-east-1 \
  --nodegroup-name workers \
  --node-type t3.medium \
  --nodes 2
```

---

## 🔐 OIDC CREATION

Associate IAM OIDC provider with the cluster. OIDC is required for IRSA (IAM Roles for Service Accounts) so that each pod can securely access AWS API services.

```bash
eksctl utils associate-iam-oidc-provider \
  --cluster demo-cluster \
  --approve
```

---

## 📋 AWS LOAD BALANCER CONTROLLER SETUP

### Step 1: Download IAM Policy

Download the IAM policy JSON file for the AWS Load Balancer Controller.

```bash
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.11.0/docs/install/iam_policy.json
```

### Step 2: Create IAM Policy

Create the IAM policy using the downloaded JSON file.

```bash
aws iam create-policy \
  --policy-name AWSLoadBalancerControllerIAMPolicy \
  --policy-document file://iam_policy.json
```

### Step 3: Create Service Account

Create a service account and attach the policy we just created.

```bash
eksctl create iamserviceaccount \
  --cluster demo-cluster \
  --namespace kube-system \
  --name aws-load-balancer-controller \
  --attach-policy-arn arn:aws:iam::<ACCOUNT-ID>:policy/AWSLoadBalancerControllerIAMPolicy \
  --approve
```

### Step 4: Install ALB Controller

Install the AWS Load Balancer Controller using Helm chart and attach the service account. This allows the controller to securely access AWS ALB API.

```bash
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=demo-cluster \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller \
  --set region=us-east-1 \
  --set vpcId=<VPC-ID>
```

---

## 💾 EBS CSI DRIVER SETUP

### Step 1: Create Service Account

Create a service account in the cluster and attach the EBS Driver policy.

```bash
eksctl create iamserviceaccount \
  --cluster demo-cluster \
  --namespace kube-system \
  --name ebs-csi-controller-sa \
  --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
  --approve
```

### Step 2: Create EBS CSI Driver Addon

Create the EBS CSI driver addon in the cluster and attach the EBS service account. This addon is required for persistent volume support for data storage.

```bash
eksctl create addon \
  --name aws-ebs-csi-driver \
  --cluster demo-cluster \
  --service-account-role-arn <ROLE-ARN>
```

---

## 📦 APPLICATION DEPLOYMENT

### Step 1: Deploy Application

Deploy the three-tier application using Helm.

```bash
helm install three-tier-app ./helm
```

### Step 2: Apply Ingress

Apply the ingress configuration to expose the application.

```bash
kubectl apply -f helm/ingress.yaml
```

---

## 📝 Summary

This document outlines the complete setup process for deploying a highly available and secure 3-tier web application on AWS EKS with:
- ✅ EKS Cluster with multiple worker nodes
- ✅ IAM OIDC provider for secure pod authentication
- ✅ AWS Load Balancer Controller for ingress management
- ✅ EBS CSI Driver for persistent storage
- ✅ 3-tier application deployment via Helm
