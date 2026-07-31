# 🚀 LAN-Share

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)
![License](https://img.shields.io/github/license/Dulanga-Dilshan/LAN-Share)
![Stars](https://img.shields.io/github/stars/Dulanga-Dilshan/LAN-Share)
![Issues](https://img.shields.io/github/issues/Dulanga-Dilshan/LAN-Share)

A modern, containerized file-sharing web application that enables users to securely share files across a Local Area Network (LAN). Built with a modern technology stack and designed for easy deployment using Docker.

## ✨ Features

* 📂 Share files with devices connected to the same LAN
* ⚡ Fast and lightweight web interface
* 🌐 Modern frontend built with **Next.js**
* 🚀 High-performance backend powered by **FastAPI**
* 🐳 Fully containerized with **Docker**
* 🔄 Reverse proxied through **Nginx**
* 📦 One-command deployment using Docker Compose

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React

### Backend

* FastAPI
* Python

### Infrastructure

* Docker
* Docker Compose
* Nginx

---

## 📁 Project Structure

```text
LAN-Share/
├── frontend/        # Next.js application
├── backend/         # FastAPI application
├── nginx/           # Nginx configuration
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Docker
* Docker Compose
* Git

---

### Installation

Clone the repository:

```bash
git clone https://github.com/Dulanga-Dilshan/LAN-Share.git
```

Navigate into the project:

```bash
cd LAN-Share
```

Create the frontend environment file:

```bash
cd frontend
cp .env.local.example .env.local
cd ..
```

Build and start all services:

```bash
docker compose up -d --build
```

Once the containers are running, open your browser and access the application through the configured Nginx server.

---

## 🐳 Services

The application consists of the following containers:

| Service  | Description                  |
| -------- | ---------------------------- |
| Frontend | Next.js web application      |
| Backend  | FastAPI REST API             |
| Nginx    | Reverse proxy and web server |

---

## 📷 How It Works

1. Open the application in your browser.
2. Upload the file you want to share.
3. Devices connected to the same local network can access the shared file through the application.
4. Download files directly from the web interface.

---

## 🤝 Contributing

Contributions are welcome!

If you'd like to improve the project, feel free to:

* Fork the repository
* Create a new feature branch
* Commit your changes
* Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Dulanga Dilshan**

GitHub: https://github.com/Dulanga-Dilshan
