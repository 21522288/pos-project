# POS Mini Project
Mini POS system gồm **Backend (.NET 6 Web API)** và **Frontend (React + Vite)**.  
Project được đóng gói bằng **Docker** để dễ dàng cài đặt và chạy.
---
## 📌 Tech Stack
### Backend
- .NET 6 Web API
- Entity Framework Core
- SQLite
- SignalR
- Docker

### Frontend
- React
- Vite
- Axios
- Docker
---
## Prerequisites
Trước khi chạy project, đảm bảo máy đã cài:
- **Docker Desktop**
- **WSL 2 (Windows)**
👉 Nếu chưa cài Docker: https://www.docker.com/products/docker-desktop/
---

## ▶️ Run Backend
1️⃣ Build backend image
cd POS_BE/mypos_be
docker build -t pos-backend .
2️⃣ Run backend container
docker run -p 5001:80 pos-backend
3️⃣ Test backend API
GET http://localhost:5001/api/products

## ▶️ Run Frontend
1️⃣ Build frontend image
cd POS_FE/mypos_fe
docker build -t pos-frontend .
2️⃣ Run frontend container
docker run -p 3000:5173 pos-frontend
3️⃣ Open browser
http://localhost:3000
