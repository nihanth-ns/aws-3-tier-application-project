<div align="center">

# 🚀 Employee Management System
### Deployed on Amazon EKS with GitHub Actions CI/CD

![AWS](https://img.shields.io/badge/AWS-EKS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

*A production-grade containerized web application with automated CI/CD, manual deployment approval, and rolling updates on Amazon EKS.*

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Application Components](#-application-components)
- [Kubernetes Setup](#-kubernetes-setup)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Deployment Flow](#-deployment-flow)

---

## 🌟 Overview

This project demonstrates a **production-ready Employee Management System** deployed on **Amazon EKS** using **Kubernetes** and automated using **GitHub Actions**.

| Feature | Description |
|---|---|
| 🖥️ Frontend | React + Vite SPA with employee management UI |
| ⚙️ Backend | Node.js REST API with JWT authentication |
| 🗄️ Database | PostgreSQL with persistent EBS storage |
| 🔄 CI/CD | Automated builds + manual production approval |
| 📦 Registry | Amazon ECR for versioned Docker images |
| ☸️ Orchestration | Amazon EKS with rolling updates |

---

## 🏗️ Architecture

![Architecture Diagram](https://github.com/user-attachments/assets/67aea006-7d26-4631-939b-9c8fa1563ea0)

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Vite, Axios, React Router |
| **Backend** | Node.js, Express, JWT |
| **Database** | PostgreSQL |
| **Containerization** | Docker |
| **Container Registry** | Amazon ECR |
| **Orchestration** | Kubernetes on Amazon EKS |
| **Ingress** | AWS Load Balancer Controller |
| **Storage** | Amazon EBS CSI Driver |
| **CI/CD** | GitHub Actions |
| **Cloud** | Amazon Web Services (AWS) |

---

## 📦 Application Components

<details>
<summary><b>🖥️ Frontend</b></summary>

Built with **React + Vite** for fast, modern UI.

- Employee login & registration
- Employee management dashboard (CRUD)
- API communication via Axios
- Client-side routing with React Router

</details>

<details>
<summary><b>⚙️ Backend</b></summary>

Built with **Node.js + Express** as a REST API server.

- JWT-based authentication
- Employee CRUD APIs
- PostgreSQL database connectivity
- Secure token generation

</details>

<details>
<summary><b>🗄️ Database</b></summary>

**PostgreSQL** with persistent storage via Amazon EBS.

- Users table
- Employees table
- Data persisted via Kubernetes PVC → EBS Volume

</details>

---

## ☸️ Kubernetes Setup

### Deployments

| Deployment | Replicas | Purpose |
|---|---|---|
| `frontend-deployment` | Multiple pods | Serves the React application |
| `backend-deployment` | Multiple pods | Serves the REST APIs |
| `postgres-deployment` | 1 pod | Manages the PostgreSQL database |

### Services

| Service | Type | Purpose |
|---|---|---|
| `frontend-service` | ClusterIP | Exposes frontend pods internally |
| `backend-service` | ClusterIP | Exposes backend API pods internally |
| `database-service` | ClusterIP | Exposes PostgreSQL internally only |

### Ingress

AWS Application Load Balancer routes traffic:

```
/ → Frontend Service
/api → Backend Service
```

### Storage

```
Persistent Volume Claim (PVC)
        ↓
Amazon EBS Volume
        ↓
EBS CSI Driver (manages provisioning)
```

---

## 🔄 CI/CD Pipeline

### 🔧 Build Pipeline (Auto-triggered on Push)

```
Developer pushes code to GitHub
        ↓
GitHub Actions workflow starts
        ↓
Build Frontend Docker Image
        ↓
Build Backend Docker Image
        ↓
Push images to Amazon ECR
        ↓
Email notification sent to Admin
```

### 🚀 Deployment Pipeline (Manual Approval)

```
Admin reviews the build
        ↓
Admin manually triggers deployment
        ↓
GitHub Actions pulls latest images from ECR
        ↓
EKS Deployments are updated
        ↓
Kubernetes performs rolling update
        ↓
New version live for users ✅
```

---

## 📤 Amazon ECR Repositories

| Repository | Purpose |
|---|---|
| `frontend-repo` | Stores versioned frontend Docker images |
| `backend-repo` | Stores versioned backend Docker images |

**Benefits of ECR:**
- ✅ Centralized & secure image registry
- ✅ Versioned image tags for easy rollback
- ✅ Seamless integration with EKS

---

## 🚦 Deployment Flow

```
Developer Push
      ↓
GitHub Actions (Build)
      ↓
Docker Images Built → Pushed to ECR
      ↓
Email Notification → Admin
      ↓
Manual Approval by Admin
      ↓
GitHub Actions (Deploy)
      ↓
EKS Deployments Updated
      ↓
Rolling Update (zero downtime)
      ↓
Users access the new version 🎉
```

---
