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
|-------------|----------|
| **Node.js** | Server runtime |
| **Express.js** | Web framework for routing and middleware |
| **MongoDB** | NoSQL database for flexible data storage |
| **Mongoose** | ODM for MongoDB schema modeling |
| **JWT (JSON Web Tokens)** | Secure authentication and authorization |

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
   ```

4. **Run the server**

   ```bash
   npm run dev
   ```

---

## 🧪 API Endpoints (Sample)

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| `POST` | `/api/auth/register` | Register a new user         |
| `POST` | `/api/auth/login`    | Login and get JWT token     |
| `GET`  | `/api/projects`      | Get all projects of user    |
| `POST` | `/api/projects`      | Create a new project        |
| `POST` | `/api/tasks`         | Create or assign a new task |

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

