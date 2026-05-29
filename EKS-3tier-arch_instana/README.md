# Three-Tier Application Deployment on Amazon EKS using Helm

## Project Overview

This project demonstrates the deployment of a microservices-based three-tier application on Amazon EKS (Elastic Kubernetes Service).

The primary objective of this project is to understand and implement production-style Kubernetes deployment on AWS using:

* Amazon EKS
* Helm
* AWS Load Balancer Controller
* Kubernetes Ingress
* OIDC and IRSA
* EBS CSI Driver
* Amazon EBS Persistent Storage

The application is deployed using an existing Helm chart and exposed to the internet through an AWS Application Load Balancer (ALB).

<img width="1693" height="929" alt="ChatGPT Image May 29, 2026, 01_42_27 PM" src="https://github.com/user-attachments/assets/160c0ecc-ed89-466a-8243-e11c782a6ad4" />


# Architecture Explanation

## 1. Amazon EKS Cluster

Amazon EKS provides the managed Kubernetes control plane.

Responsibilities:

* Cluster management
* Scheduling pods
* Managing Deployments and Services
* Service discovery
* Container orchestration

The application workloads run on EC2 worker nodes attached to the EKS cluster.

---

## 2. OIDC Provider

OIDC (OpenID Connect) is associated with the EKS cluster.

Purpose:

* Enables IAM Roles for Service Accounts (IRSA)
* Allows Kubernetes pods to securely access AWS services
* Eliminates the need to grant permissions directly to worker nodes

Benefits:

* Improved security
* Least privilege access
* Better AWS integration

---

## 3. IAM Roles for Service Accounts (IRSA)

IRSA allows Kubernetes service accounts to assume AWS IAM roles.

In this project, two service accounts are configured.

### AWS Load Balancer Controller Service Account

Used by:

* AWS Load Balancer Controller

Permissions:

* Create ALB
* Create Target Groups
* Create Listener Rules
* Manage Security Groups
* Register Targets

Attached Policy:

* AWSLoadBalancerControllerIAMPolicy

---

### EBS CSI Driver Service Account

Used by:

* EBS CSI Driver

Permissions:

* Create EBS Volumes
* Attach EBS Volumes
* Delete EBS Volumes
* Manage Storage Lifecycle

Attached Policy:

* AmazonEBSCSIDriverPolicy

---

## 4. AWS Load Balancer Controller

The AWS Load Balancer Controller runs inside the EKS cluster.

Responsibilities:

* Watches Kubernetes Ingress resources
* Creates AWS Application Load Balancers
* Creates Target Groups
* Configures Listener Rules
* Registers Kubernetes Services

Workflow:

Ingress Created
→ Controller Detects Ingress
→ Controller Calls AWS APIs
→ ALB Created Automatically

---

## 5. Kubernetes Ingress

Ingress is a Kubernetes resource that defines routing rules for external traffic.

Purpose:

* Expose applications externally
* Define URL routing
* Integrate Kubernetes with AWS ALB

The Ingress resource itself does not process traffic.

Instead:

Ingress
→ AWS Load Balancer Controller
→ ALB Creation

---

## 6. Application Load Balancer (ALB)

The ALB is automatically provisioned by the AWS Load Balancer Controller.

Responsibilities:

* Receive internet traffic
* Route requests to Kubernetes services
* Perform health checks
* Load balance traffic

Traffic Flow:

Users
→ ALB
→ Kubernetes Service
→ Pods

---

## 7. Kubernetes Service

The Kubernetes Service acts as a stable endpoint for pods.

Service Type:

* ClusterIP

Responsibilities:

* Service discovery
* Internal load balancing
* Routing traffic to healthy pods

Traffic Flow:

ALB
→ Service
→ Pods

---

## 8. Application Pods

Pods host the application containers.

Benefits:

* Self-healing
* Scalability
* High availability

Kubernetes automatically schedules and manages pods across worker nodes.

---

## 9. EBS CSI Driver

The EBS CSI Driver provides persistent storage support for Kubernetes workloads.

Responsibilities:

* Provision EBS volumes
* Attach volumes to worker nodes
* Mount volumes into pods
* Manage storage lifecycle

Benefits:

* Persistent application data
* Dynamic volume provisioning
* Integration with Kubernetes Persistent Volumes

---

# Deployment Workflow

## Step 1

Create Amazon EKS Cluster

Result:

* Kubernetes control plane created
* EC2 worker nodes created

---

## Step 2

Associate OIDC Provider

Result:

* IRSA enabled

---

## Step 3

Create IAM Policy for AWS Load Balancer Controller

Result:

* AWS permissions defined

---

## Step 4

Create IAM Service Account for AWS Load Balancer Controller

Result:

* Controller can access AWS APIs securely

---

## Step 5

Install AWS Load Balancer Controller using Helm

Result:

* Controller starts watching Ingress resources

---

## Step 6

Create IAM Service Account for EBS CSI Driver

Result:

* Storage permissions configured

---

## Step 7

Install EBS CSI Driver Add-on

Result:

* Persistent storage enabled

---

## Step 8

Deploy Application using Helm

Result:

* Deployments and Services created

---

## Step 9

Apply Kubernetes Ingress Resource

Result:

* AWS Load Balancer Controller automatically provisions ALB

---

## Step 10

Access Application

Result:

* Application available through ALB DNS endpoint

---

# Technologies Used

* Amazon EKS
* Kubernetes
* Helm
* Amazon EC2
* IAM
* OIDC
* IRSA
* AWS Load Balancer Controller
* Application Load Balancer (ALB)
* Kubernetes Ingress
* EBS CSI Driver
* Amazon EBS

---

# My Contribution

This project focuses on infrastructure deployment and Kubernetes operations.

My responsibilities included:

* Creating and configuring Amazon EKS
* Configuring OIDC and IRSA
* Creating IAM policies and service accounts
* Installing AWS Load Balancer Controller
* Installing EBS CSI Driver
* Deploying the application using Helm
* Configuring Kubernetes Ingress
* Exposing the application through ALB
* Managing Kubernetes resources and AWS integrations

---

# Important Note

The application source code, microservices, and Helm chart used in this project were not developed by me.

I used an existing open-source application and Helm chart for deployment purposes.

My work was focused on:

* AWS infrastructure setup
* Kubernetes deployment
* EKS administration
* Helm deployment
* Ingress configuration
* Storage integration
* Load balancing
* IAM and security configuration

The objective of this project was to gain hands-on experience with deploying and operating containerized applications on Amazon EKS in a production-style environment.

---

# Key Learnings

* Amazon EKS Administration
* Kubernetes Deployments and Services
* Helm Package Management
* Kubernetes Ingress
* AWS Load Balancer Controller
* OIDC and IRSA
* Amazon EBS CSI Driver
* Persistent Storage Management
* AWS Networking
* IAM Security Best Practices
* Production-Style Kubernetes Deployments
