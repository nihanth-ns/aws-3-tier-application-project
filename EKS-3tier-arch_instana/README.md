# 🚀 Three-Tier Application Deployment on Amazon EKS using Helm

## 📋 Project Overview

This project demonstrates the deployment of a **microservices-based three-tier application** on Amazon EKS (Elastic Kubernetes Service).

### 🎯 Primary Objectives

The primary objective of this project is to understand and implement production-style Kubernetes deployment on AWS using:

- 🏗️ **Amazon EKS** - Managed Kubernetes Control Plane
- 📦 **Helm** - Package Management for Kubernetes
- ⚖️ **AWS Load Balancer Controller** - Dynamic ALB Provisioning
- 🔄 **Kubernetes Ingress** - External Traffic Routing
- 🔐 **OIDC and IRSA** - Secure AWS Service Access
- 💾 **EBS CSI Driver** - Persistent Volume Management
- 📁 **Amazon EBS Persistent Storage** - Data Persistence

The application is deployed using an existing Helm chart and exposed to the internet through an AWS Application Load Balancer (ALB).

![Architecture Diagram](https://github.com/user-attachments/assets/160c0ecc-ed89-466a-8243-e11c782a6ad4)

---

## 🏛️ Architecture Explanation

### 1️⃣ Amazon EKS Cluster

**Amazon EKS** provides the managed Kubernetes control plane.

**Responsibilities:**
- ✅ Cluster management
- ✅ Scheduling pods
- ✅ Managing Deployments and Services
- ✅ Service discovery
- ✅ Container orchestration

The application workloads run on EC2 worker nodes attached to the EKS cluster.

---

### 2️⃣ OIDC Provider

**OIDC (OpenID Connect)** is associated with the EKS cluster.

**Purpose:**
- 🔑 Enables IAM Roles for Service Accounts (IRSA)
- 🔒 Allows Kubernetes pods to securely access AWS services
- 🚫 Eliminates the need to grant permissions directly to worker nodes

**Benefits:**
- 🛡️ Improved security
- 🎯 Least privilege access
- 🔗 Better AWS integration

---

### 3️⃣ IAM Roles for Service Accounts (IRSA)

**IRSA** allows Kubernetes service accounts to assume AWS IAM roles.

In this project, two service accounts are configured.

#### 🔹 AWS Load Balancer Controller Service Account

**Used by:**
- AWS Load Balancer Controller

**Permissions:**
- 📌 Create ALB
- 📌 Create Target Groups
- 📌 Create Listener Rules
- 📌 Manage Security Groups
- 📌 Register Targets

**Attached Policy:**
- `AWSLoadBalancerControllerIAMPolicy`

---

#### 🔹 EBS CSI Driver Service Account

**Used by:**
- EBS CSI Driver

**Permissions:**
- 💾 Create EBS Volumes
- 💾 Attach EBS Volumes
- 💾 Delete EBS Volumes
- 💾 Manage Storage Lifecycle

**Attached Policy:**
- `AmazonEBSCSIDriverPolicy`

---

### 4️⃣ AWS Load Balancer Controller

The **AWS Load Balancer Controller** runs inside the EKS cluster.

**Responsibilities:**
- 👁️ Watches Kubernetes Ingress resources
- 🎯 Creates AWS Application Load Balancers
- 📊 Creates Target Groups
- ⚙️ Configures Listener Rules
- 📱 Registers Kubernetes Services

**Workflow:**
```
Ingress Created
    ↓
Controller Detects Ingress
    ↓
Controller Calls AWS APIs
    ↓
ALB Created Automatically
```

---

### 5️⃣ Kubernetes Ingress

**Ingress** is a Kubernetes resource that defines routing rules for external traffic.

**Purpose:**
- 🌐 Expose applications externally
- 🛣️ Define URL routing
- 🔗 Integrate Kubernetes with AWS ALB

The Ingress resource itself does not process traffic.

**Instead:**
```
Ingress
    ↓
AWS Load Balancer Controller
    ↓
ALB Creation
```

---

### 6️⃣ Application Load Balancer (ALB)

The **ALB** is automatically provisioned by the AWS Load Balancer Controller.

**Responsibilities:**
- 🌍 Receive internet traffic
- 🚦 Route requests to Kubernetes services
- 💓 Perform health checks
- ⚖️ Load balance traffic

**Traffic Flow:**
```
Users
  ↓
ALB
  ↓
Kubernetes Service
  ↓
Pods
```

---

### 7️⃣ Kubernetes Service

The **Kubernetes Service** acts as a stable endpoint for pods.

**Service Type:**
- `ClusterIP`

**Responsibilities:**
- 🔍 Service discovery
- ⚖️ Internal load balancing
- 🔄 Routing traffic to healthy pods

**Traffic Flow:**
```
ALB
  ↓
Service
  ↓
Pods
```

---

### 8️⃣ Application Pods

**Pods** host the application containers.

**Benefits:**
- 🔧 Self-healing
- 📈 Scalability
- 💪 High availability

Kubernetes automatically schedules and manages pods across worker nodes.

---

### 9️⃣ EBS CSI Driver

The **EBS CSI Driver** provides persistent storage support for Kubernetes workloads.

**Responsibilities:**
- 📦 Provision EBS volumes
- 🔌 Attach volumes to worker nodes
- 🔗 Mount volumes into pods
- 🔄 Manage storage lifecycle

**Benefits:**
- 💾 Persistent application data
- 🚀 Dynamic volume provisioning
- 🔗 Integration with Kubernetes Persistent Volumes

---

## 🔧 Deployment Workflow

| Step | Action | Result |
|------|--------|--------|
| 1️⃣ | Create Amazon EKS Cluster | Kubernetes control plane & EC2 worker nodes created |
| 2️⃣ | Associate OIDC Provider | IRSA enabled |
| 3️⃣ | Create IAM Policy for AWS Load Balancer Controller | AWS permissions defined |
| 4️⃣ | Create IAM Service Account for AWS Load Balancer Controller | Controller can access AWS APIs securely |
| 5️⃣ | Install AWS Load Balancer Controller using Helm | Controller starts watching Ingress resources |
| 6️⃣ | Create IAM Service Account for EBS CSI Driver | Storage permissions configured |
| 7️⃣ | Install EBS CSI Driver Add-on | Persistent storage enabled |
| 8️⃣ | Deploy Application using Helm | Deployments and Services created |
| 9️⃣ | Apply Kubernetes Ingress Resource | AWS Load Balancer Controller automatically provisions ALB |
| 🔟 | Access Application | Application available through ALB DNS endpoint |

---

## 🛠️ Technologies Used

| Category | Technology |
|----------|-----------|
| **Container Orchestration** | 🐳 Kubernetes, Amazon EKS |
| **Infrastructure** | 🏗️ Amazon EC2, IAM |
| **Package Management** | 📦 Helm |
| **Load Balancing** | ⚖️ Application Load Balancer (ALB) |
| **Routing** | 🔄 Kubernetes Ingress |
| **Identity & Security** | 🔐 OIDC, IRSA |
| **Storage** | 💾 EBS CSI Driver, Amazon EBS |

---

## 👨‍💻 My Contribution

This project focuses on infrastructure deployment and Kubernetes operations.

**My responsibilities included:**

- 🏗️ Creating and configuring Amazon EKS
- 🔐 Configuring OIDC and IRSA
- 📋 Creating IAM policies and service accounts
- 🔧 Installing AWS Load Balancer Controller
- 💾 Installing EBS CSI Driver
- 📦 Deploying the application using Helm
- 🛣️ Configuring Kubernetes Ingress
- 🌐 Exposing the application through ALB
- 🎛️ Managing Kubernetes resources and AWS integrations

---

## ⚠️ Important Note

The **application source code, microservices, and Helm chart** used in this project were **not developed by me**.

I used an existing open-source application and Helm chart for **deployment purposes**. Check out the source code file **https://github.com/Nihanth-NS/three-tier-architecture-demo**

**My work was focused on:**

- 🏗️ AWS infrastructure setup
- ☸️ Kubernetes deployment
- 🛠️ EKS administration
- 📦 Helm deployment
- 🛣️ Ingress configuration
- 💾 Storage integration
- ⚖️ Load balancing
- 🔐 IAM and security configuration

**The objective** of this project was to gain hands-on experience with deploying and operating containerized applications on Amazon EKS in a production-style environment.

---
