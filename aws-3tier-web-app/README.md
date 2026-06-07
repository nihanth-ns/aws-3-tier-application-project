# 🏗️ AWS 3-Tier Web Application Architecture

A production-style, highly available and secure **3-Tier Web Application** deployed on **Amazon Web Services** across multiple Availability Zones using Flask, Amazon EC2, Application Load Balancers, and Amazon RDS MySQL.

---

## 📐 Architecture Diagram

<img width="1536" height="1024" alt="ChatGPT Image May 22, 2026, 11_24_17 AM" src="https://github.com/user-attachments/assets/76ac859b-e847-42e8-92eb-eb7e51fc0f7c" />


> *Custom VPC with 2 Availability Zones — Internet-Facing ALB → Frontend EC2 → Internal ALB → Backend EC2 → RDS MySQL (Multi-AZ)*

---

## 🗂️ Project Structure

```
aws-3tier-web-app/
├── frontend/
│   └── app.py           # Flask frontend server
├── backend/
│   └── app.py           # Flask backend API server
├── database/
│   └── schema.sql       # MySQL schema and seed data
└── README.md
```

---

## 🧱 Architecture Overview

This project implements a classic 3-tier architecture on AWS with full network isolation, load balancing, and high availability:

| Tier | Component | Subnet Type |
|------|-----------|-------------|
| Access | Bastion Host (EC2) | Public |
| Frontend | Flask App (EC2) + Internet-Facing ALB | Private |
| Backend | Flask API (EC2) + Internal ALB | Private |
| Database | Amazon RDS MySQL (Multi-AZ) | Private (DB) |

### Key Design Decisions

- **Custom VPC** with public and private subnets across **2 Availability Zones** (AZ-A and AZ-B)
- **Public Subnets** host only Bastion Host EC2 instances for secure SSH jump access
- **Frontend Tier** — Flask application on private EC2 instances behind an **Internet-Facing Application Load Balancer**
- **Backend Tier** — Flask REST API on private EC2 instances behind an **Internal Application Load Balancer** (never directly exposed to the internet)
- **Database Tier** — Amazon RDS MySQL in **Multi-AZ deployment** for automatic failover and redundancy
- **Security Group chaining** — Only backend EC2 security group is allowed to reach RDS on port 3306

---

## 🔄 Traffic Flow

```
User
 │
 ▼
Internet
 │
 ▼
Internet-Facing Application Load Balancer (Public)
 │
 ▼
Frontend EC2 — Flask App (Private Subnet)
 │   Proxies API calls to ↓
 ▼
Internal Application Load Balancer (Private)
 │
 ▼
Backend EC2 — Flask API (Private Subnet)
 │
 ▼
Amazon RDS MySQL — Multi-AZ (Private DB Subnet)
```

> **Note:** The browser never talks directly to the backend. All backend communication is proxied through the frontend Flask server to avoid CORS issues and maintain security.

---

## ⚙️ Prerequisites — Ubuntu Server Setup

Run these commands on each EC2 instance before deploying the application.

### 1. Update System Packages
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Python 3 and pip
```bash
sudo apt install python3 python3-pip -y
```

### 3. Install Flask (Both Frontend & Backend)
```bash
pip3 install flask
```

### 4. Install Requests Library (Frontend only)
```bash
pip3 install requests
```

### 5. Install PyMySQL (Backend only)
```bash
pip3 install pymysql
```

---

## 🚀 Running the Applications

### Frontend Server
```bash
cd frontend/
python3 app.py
```
> Runs on port **5000**. Ensure EC2 security group allows inbound traffic on port 5000 from the Internet-Facing ALB.

### Backend Server
```bash
cd backend/
python3 app.py
```
> Runs on port **5000**. Ensure EC2 security group allows inbound traffic on port 5000 from the Internal ALB only.

### Database Setup
Connect to RDS from the backend EC2 via Bastion Host and run:
```bash
mysql -h <your-rds-endpoint> -u admin -p
```
Then execute:
```sql
source database/schema.sql
```

---

## 🔧 Configuration

### Frontend (`frontend/app.py`)
Update the backend URL to your Internal ALB DNS name:
```python
backend_url = f"http://<your-internal-alb-dns>/data/{id}"
```

### Backend (`backend/app.py`)
Update RDS connection details:
```python
DB_HOST = "your-rds-endpoint.us-east-1.rds.amazonaws.com"
DB_USER = "admin"
DB_PASSWORD = "your-password"
DB_NAME = "mydb"
```

> ⚠️ **For production:** Never hardcode credentials. Use **AWS Secrets Manager** or environment variables.

---

## 🔐 Security Architecture

| Layer | Security Measure |
|-------|--------------------|
| Network | Backend and RDS in private subnets — no internet access |
| Access | Bastion Host as the only SSH entry point to private instances |
| Load Balancer | Internal ALB restricts backend to VPC-internal traffic only |
| Database | RDS SG allows port 3306 only from Backend EC2 Security Group |
| Application | Frontend proxies all backend calls — browser never hits backend directly |

---

## 🚧 Problems Faced & Solutions

| # | Problem | Root Cause | Solution |
|---|---------|------------|----------|
| 1 | `ERROR 2003: Can't connect to MySQL server` | RDS Security Group didn't allow port 3306 from backend EC2 | Added inbound rule in RDS SG referencing the Backend EC2 Security Group ID directly |
| 2 | `pymysql.ProgrammingError: Table doesn't exist` | Backend queried RDS before the DB/table was created | Created `mydb` database, `messages` table, and inserted seed data manually via MySQL client |
| 3 | Backend ALB target instances showing **Unhealthy** | No health check route existed in the Flask app | Added dedicated `/health` route returning HTTP 200; reconfigured ALB health check path to `/health` |
| 4 | `Permission denied` running Flask on port 80 | Linux blocks non-root users from binding to ports below 1024 | Switched Flask to run on port **5000** and updated ALB target group port accordingly |
| 5 | Frontend broke every time backend EC2 was restarted | Backend EC2 public IP was hardcoded in frontend code | Replaced hardcoded IP with the **Internal ALB DNS name** for stable, persistent routing |
| 6 | CORS error — browser blocked backend API calls | Browser blocked direct cross-origin requests to backend | Re-architected: frontend Flask server now proxies all backend calls; browser only talks to frontend |
| 7 | `JSONDecodeError` in frontend Flask app | Frontend was hitting the wrong backend route returning plain text | Fixed endpoint from `/` to `/data/<id>` which returns a proper `jsonify()` response |
| 8 | Internal ALB unreachable from frontend EC2 | Listener and target group were misconfigured | Reconfigured Internal ALB listener on port 80 mapped to target group on port 5000 |
| 9 | Cannot SSH into private EC2 instances | Backend/frontend EC2s in private subnets have no public IP | Deployed Bastion Host EC2 in public subnet; used it as SSH jump server to reach private instances |
| 10 | Database downtime concern with single-AZ RDS | Single AZ = single point of failure for the database layer | Enabled **Multi-AZ deployment** in RDS for automatic standby failover with no data loss |

---

## 📌 AWS Services Used

| Service | Purpose |
|---------|---------|
| **Amazon EC2** | Frontend and backend compute instances |
| **Application Load Balancer** | Internet-facing (frontend) and internal (backend) traffic distribution |
| **Amazon RDS MySQL** | Managed relational database with Multi-AZ high availability |
| **Amazon VPC** | Network isolation with public/private subnet design |
| **Security Groups** | Firewall rules enforcing least-privilege access between tiers |
| **Bastion Host** | Secure SSH jump server for accessing private EC2 instances |

---

## 🛠️ Troubleshooting Tips

```bash
# Test backend connectivity from frontend EC2
curl http://<internal-alb-dns>/health

# Test RDS connectivity from backend EC2
mysql -h <rds-endpoint> -u admin -p

# Check if Flask is running
ps aux | grep python3

# Check port binding
sudo netstat -tlnp | grep 5000

# Test internal routing
curl http://localhost:5000/data/1
```

---

## 👨‍💻 Author

**Nihanth**
Cloud & DevOps Enthusiast | AWS | Automation | Containerization 
