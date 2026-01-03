# 🛡️ MediaShield – Secure Video Processing & Streaming Platform

MediaShield is a **comprehensive full-stack web application** designed for **secure video management**, **automated sensitivity analysis**, and **seamless video streaming**.  
This project is developed as part of a **Full-Stack Assignment** and demonstrates real-world architecture, security, and scalability best practices.

---

## 🌐 Live Application URL

🔗 **Live App:**  
https://video-vault--badavathnarend9.replit.app

---

## 📄 Assignment Title

**Video Upload, Sensitivity Processing, and Streaming Application**

---

## 📌 Assignment Objectives

The main objectives of this project are to:

- Build a **full-stack web application**
- Enable **secure video upload and storage**
- Perform **content sensitivity analysis** (Safe / Flagged)
- Display **real-time processing progress**
- Support **secure video streaming using HTTP range requests**
- Implement **multi-tenant architecture**
- Apply **role-based access control (RBAC)**

---

## 🧑‍💻 Author / Developer

- **Name:** Narender Badavath  
- **Email:** badavathnarender98@gmail.com  
- **GitHub:** https://github.com/narenderbadavath98  
- **LinkedIn:** https://www.linkedin.com/in/narender-badavath  

---

## ✨ Core Features

- 🔐 **Secure Video Upload**  
  Support for MP4 / MOV files with file size and format validation.

- 🧠 **Sensitivity Processing**  
  Automated (simulated) analysis to classify videos as **Safe** or **Flagged**.

- 🎥 **HTTP Range Streaming**  
  Secure video playback using **206 Partial Content** with seek support.

- 👥 **RBAC & Multi-Tenant Architecture**  
  Viewer, Editor, and Admin roles with strict user-level video isolation.

- ⏱️ **Real-Time Progress Updates**  
  Live upload and processing status using **Socket.io**.

- 🗂️ **Video Management Tools**  
  Rename, delete, and download uploaded videos (owner/admin only).

---

## 🔄 Workflow Demonstration (Complete User Journey)

1. **User Registration / Login**  
   - Secure JWT-based authentication  
   - Multiple users can log in simultaneously  

2. **Video Upload**  
   - Intuitive upload interface  
   - Upload progress indicator  

3. **Processing Phase**  
   - Real-time updates on sensitivity analysis  
   - Status updates via Socket.io  

4. **Content Review**  
   - Clear status display: **Safe / Flagged**  
   - Role-based actions enabled  

5. **Video Streaming**  
   - Seamless playback of processed videos  
   - Secure HTTP range-based streaming  

6. **Management Tools**  
   - Video library with filtering  
   - Rename, delete, and download options  

---

## 🔐 Roles & Permissions

| Role   | Permissions |
|------|------------|
| Viewer | View and stream videos |
| Editor | Upload, rename, delete, and download own videos |
| Admin | Full system access |

---

## 🏢 Multi-Tenant Architecture

- Each user can access **only their own uploaded videos**
- Videos are linked using:
  ```js
  uploadedBy: userId


## Tech Stack
-Frontend

-React

-Vite

-Tailwind CSS

-Lucide Icons

-Axios

-Socket.io Client

-Backend

-Node.js

-Express.js

-MongoDB (Mongoose)

-JWT Authentication

-Multer (File Upload)

-Socket.io (Real-time updates)

-Infrastructure

-FFmpeg (Video processing – simulated)

-HTTP Range Requests for streaming

## Project Structure
├── backend
│   ├── config
│   ├── models
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── services
│   └── uploads
│
├── frontend
│   ├── pages
│   ├── components
│   ├── context
│   └── utils
│
└── README.md

## Video Processing Pipeline

Upload validation

Secure storage

Sensitivity analysis

Status updates

Streaming preparation

Real-Time Progress Stages

10% – Upload completed

40% – Processing started

70% – Sensitivity analysis

100% – Processing completed

## Secure Video Streaming

HTTP Range-based streaming

Supports seeking and partial loading

Streaming endpoint:

GET /api/videos/stream/:videoId


Each video streams only its own file

No static or hardcoded file paths

## 🧪 Testing & Quality Standards

Manual testing for critical workflows

Proper error handling

Clean and maintainable codebase

Secure API endpoints

## Responsive UI

📦 Deliverables (As Per Assignment)

✅ Working full-stack application

✅ GitHub repository with clean code

✅ Live deployed application

✅ Complete documentation (README)

✅ Demo video showcasing full workflow

✅ Architecture & design explanation

 ## 🚀 Local Setup Instructions
Clone Repository
git clone <your-github-repo-url>

Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

Environment Variables
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000

🧠 Design Decisions & Assumptions

Sensitivity analysis is simulated as allowed by assignment

Focus is on system design, security, and workflow clarity

HTTP range streaming improves performance and scalability

## ✅ Success Criteria Achieved

✔ Secure video upload & storage

✔ Real-time processing updates

✔ Sensitivity classification

✔ Secure HTTP range-based streaming

✔ Multi-user isolation

✔ Role-based access control

✔ Responsive UI

✔ Public deployment

⭐ Thank you for reviewing the MediaShield full-stack assignment project.

