# PrimeTrade Frontend Developer Assignment

A full-stack web application built as part of the PrimeTrade Frontend Developer Intern assignment.

## Tech Stack ARE

### Frontend
- React (Vite)
- Tailwind CSS (v4)
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- bcrypt for password hashing

---

## ✨ Features

- User Registration & Login (JWT-based authentication)
- Protected Dashboard
- Task Management (Create, Read, Delete)
- User-specific data isolation
- Secure password hashing
- Clean and responsive UI
- Scalable project structure

---

## 🔐 Authentication Flow

- JWT token generated on login
- Token stored in localStorage
- Axios interceptor attaches token to requests
- Protected routes redirect unauthenticated users

---

## 🧪 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Tasks
- `GET /api/tasks`
- `POST /api/tasks`
- `DELETE /api/tasks/:id`

---

## 📦 How to Run Locally

### Frontend
cd client
npm install
npm run dev

### Backend
```bash
cd server
npm install
npm run dev

📈 Scalability Notes

Frontend uses Context API (can scale to Redux)

Backend structured with routes, controllers, middleware

JWT-based auth suitable for microservices

Easy to extend with role-based access & pagination

Can be deployed using Docker + CI/CD pipelines

🧾 Postman Collection

Postman collection is included in the repository for API testing.

👤 Author

Vivek Prakash


Commit & push:
```bash
git add README.md
git commit -m "add project README"
git push origin main