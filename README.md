# 🚀 LAN-Share

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi\&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker\&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx\&logoColor=white)
![License](https://img.shields.io/github/license/Dulanga-Dilshan/LAN-Share)
![Stars](https://img.shields.io/github/stars/Dulanga-Dilshan/LAN-Share)
![Issues](https://img.shields.io/github/issues/Dulanga-Dilshan/LAN-Share)

A modern, lightweight, and fully containerized file-sharing application that enables users to share files across a **Local Area Network (LAN)**. The application is built with **Next.js** and **FastAPI**, containerized using **Docker**, and served through **Nginx**.

---

## ✨ Features

* 📂 Share files with devices connected to the same LAN
* ⚡ Fast and responsive user interface
* 🚀 High-performance backend powered by FastAPI
* 🌐 Modern frontend built with Next.js
* 🐳 Fully containerized using Docker
* 🔄 Nginx reverse proxy (containerized)
* 📦 One-command deployment using Docker Compose
* 💻 Cross-platform (Windows, Linux, macOS)

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript

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
├── frontend/          # Next.js application
├── backend/           # FastAPI application
├── nginx/             # Nginx configuration
├── docker-compose.yml
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Before you begin, make sure you have the following installed:

* Git
* Docker
* Docker Compose

---

## Installation

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

Build and start all containers:

```bash
docker compose up -d --build
```

---

# 🌐 Accessing the Application

After all containers have started successfully, the application can be accessed in two ways.

### Host Machine

If you are using the computer running Docker, open:

```
http://localhost
```

### Other Devices on the Same LAN

Devices connected to the same Local Area Network can access the application using the **host machine's IP address**.

To find the IP address of the host machine:

**Windows**

```bash
ipconfig
```

Look for the **IPv4 Address** of your active network adapter.

For example:

```
IPv4 Address . . . . . . . . . : 192.168.1.100
```

Then other devices can access the application by visiting:

```
http://192.168.1.100
```

> **Note:** Every device must be connected to the same Local Area Network (LAN).

---

# 🐳 Services

The application consists of three Docker containers.

| Service  | Description                          |
| -------- | ------------------------------------ |
| Frontend | Next.js web application              |
| Backend  | FastAPI REST API                     |
| Nginx    | Reverse proxy and static file server |

---

# 📖 How It Works

1. Start the application using Docker Compose.
2. Open the application in your browser.
3. Upload files through the web interface.
4. Any device connected to the same LAN can access and download the shared files.

---

# 🔧 Development

To stop all running containers:

```bash
docker compose down
```

To rebuild the containers after making changes:

```bash
docker compose up -d --build
```

View container logs:

```bash
docker compose logs -f
```

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to contribute:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/my-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature/my-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

See the **LICENSE** file for more information.

---

# 👨‍💻 Author

**Dulanga Dilshan**

GitHub: https://github.com/Dulanga-Dilshan

