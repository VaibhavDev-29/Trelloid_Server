# 🧩 Trelloid

**Trelloid** is a **Trello-inspired backend practice project** built to understand and implement real-world concepts of **project management systems**.  
It focuses on how teams collaborate, manage tasks, and track progress efficiently — all powered by a clean, RESTful backend.

---

## 🚀 Features

- 🔐 **User Authentication & Authorization** using JWT  
- 🧑‍🤝‍🧑 **Project & Team Management** — multiple users per project  
- 📋 **Task Management** — create, assign, and update tasks  
- 📝 **Project Notes & Activity Logs** for tracking actions  
- 🗄️ **MongoDB Schema Design** — relational data modeling with Mongoose  

---

## 🧠 Purpose

> Built as a **learning project** to explore:
> - Backend architecture and clean project structure  
> - MongoDB relationships between users, projects, and tasks  
> - Authentication & authorization workflows using JWT  
> - RESTful API best practices  

---

## 🧰 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Node.js | Server-side JavaScript runtime |
| Express.js | Web framework for routing and middleware |
| MongoDB | NoSQL database for flexible and scalable data storage |
| Mongoose | ODM for MongoDB schema modeling and database operations |
| bcrypt | Secure password hashing |
| JSON Web Token (JWT) | Authentication and authorization using tokens |
| cookie-parser | Parsing and managing HTTP cookies |
| cors | Handling Cross-Origin Resource Sharing (CORS) |
| express-validator | Request validation and sanitization |
| multer | Handling file uploads |
| nodemailer | Sending emails from the server |
| mailgen | Generating responsive and professional email templates |
| dotenv | Managing environment variables securely |
| nodemon | Development tool for automatic server restarts |
---

## 📁 Folder Structure (Planned)

```

Trelloid_Server/
│
├── src/
│   ├── controller/        # Route logic and request handlers
│   ├── db/                # Database connection and config
│   ├── middleware/        # Auth & validation middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   ├── utils/             # Helper functions
│   ├── validators/        # Input validation logic
│   └── app.js             # Express app entry point
│
├── package.json
├── README.md
└── .env.example

````

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/VaibhavDev-29/Trelloid_Server.git
   cd Trelloid_Server

2. **Install dependencies**
    ```
   npm install
   ````

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_URI
   JWT_SECRET=your_jwt_secret_key

   for more check .env.sample
   ```

4. **Run the server**

   ```bash
   npm run start
   ```

---

## 🧪 API Endpoints
---
## 🔐 Auth Routes (`/api/v1/auth`)

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/v1/auth/register` | Register a new user (with avatar upload) |
| GET | `/api/v1/auth/verify-email/:verificationToken` | Verify user email |
| POST | `/api/v1/auth/login` | Login user and generate JWT tokens |
| POST | `/api/v1/auth/forgot-password` | Request password reset |
| GET | `/api/v1/auth/forgot-password/:token` | Reset password using token |
| POST | `/api/v1/auth/resend-email` | Resend email verification |
| GET | `/api/v1/auth/refresh-token` | Refresh access token |
| POST | `/api/v1/auth/logout` | Logout authenticated user |
| GET | `/api/v1/auth/current-user` | Get current logged-in user |
| POST | `/api/v1/auth/change-password` | Change current user password |

---

## 📁 Project Routes (`/api/v1/projects`)

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/v1/projects` | Get all projects of current user |
| POST | `/api/v1/projects` | Create a new project (Admin only) |
| GET | `/api/v1/projects/:projectId` | Get project by ID |
| PUT | `/api/v1/projects/:projectId` | Update project (Admin only) |
| DELETE | `/api/v1/projects/:projectId` | Delete project (Admin only) |

---

## 👥 Project Member Routes (`/api/v1/projects`)

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/v1/projects/:projectId/member` | Get all project members |
| POST | `/api/v1/projects/:projectId/member` | Add member to project |
| PUT | `/api/v1/projects/:projectId/member/:userId` | Update project member role |
| DELETE | `/api/v1/projects/:projectId/member/:userId` | Remove member from project |

---

## ✅ Task Routes (`/api/v1/tasks`)

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/v1/tasks/:projectId` | Get all tasks of a project |
| POST | `/api/v1/tasks/:projectId` | Create a new task (supports attachments) |
| GET | `/api/v1/tasks/:projectId/t/:taskId` | Get task by ID |
| PUT | `/api/v1/tasks/:projectId/t/:taskId` | Update task (supports attachments) |
| DELETE | `/api/v1/tasks/:projectId/t/:taskId` | Delete task |

---

## 🧩 SubTask Routes (`/api/v1/tasks/subTask`)

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/v1/tasks/subTask/:projectId/:taskId/subT` | Get all subtasks of a task |
| POST | `/api/v1/tasks/subTask/:projectId/:taskId/subT` | Create a subtask |
| GET | `/api/v1/tasks/subTask/:projectId/:taskId/subT/:subTaskId` | Get subtask by ID |
| POST | `/api/v1/tasks/subTask/:projectId/:taskId/subT/:subTaskId` | Update subtask |
| DELETE | `/api/v1/tasks/subTask/:projectId/:taskId/subT/:subTaskId` | Delete subtask |

---

## 📝 Note Routes (`/api/v1/projects/note`)

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/v1/projects/note/:projectId` | Get all notes of a project |
| POST | `/api/v1/projects/note/:projectId` | Create a project note |
| PUT | `/api/v1/projects/note/:projectId/n/:noteId` | Update a note |
| DELETE | `/api/v1/projects/note/:projectId/n/:noteId` | Delete a note |

---

## 🛡 Security & Access Control

- JWT-based authentication
- Role-based authorization  
  - `ADMIN`
  - `PROJECT_ADMIN`
  - `MEMBER`
- Input validation on all routes
- File uploads handled using **Multer**

---

---

## 🤝 Contributing

This project is for **learning and practice**, but contributions or feedback are always welcome!
Feel free to fork the repo, open issues, or submit pull requests.

---

## 🧑‍💻 Author

**Rohit Kumar**
📍 Built  for learning backend development
🌐 [GitHub Profile](https://github.com/VaibhavDev-29)

---

## 🪄 Inspiration

Inspired by **[Trello](https://trello.com)** — bringing collaborative task management ideas into backend development.

