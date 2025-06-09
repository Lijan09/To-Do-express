# Todo List API

A simple RESTful API for managing user accounts and todo lists with deadline notifications using Node.js, Express, and MongoDB.

## Features

- User registration, login, logout, and profile management
- Create, update, delete, and retrieve todo tasks
- Task deadlines with automated notification checks every minute
- Password hashing and secure authentication with JWT
- Middleware for route protection and user access control
- Clean layered architecture: Controllers, Services, Repositories
- Error handling and async support

## Tech Stack

- Node.js, Express
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- node-cron for scheduled deadline notifications
- bcrypt for password hashing
- TypeScript

## Setup & Run

1. Clone repo

```bash
git clone https://github.com/Lijan09/To-Do-express.git
cd To-Do-express
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables
   Create `.env` file and add:

```
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

4. Start the server

```bash
npm start
```

5. Access API at `http://localhost:5000/`

## Usage

- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Create task: `POST /api/list` (protected)
- Update task: `PUT /api/list/:taskId` (protected)
- Get user profile: `GET /api/users/:user` (protected)
- etc.

## Notes

- The server uses `node-cron` to check for upcoming deadlines every minute and send notifications (console logs by default).
- Extend notification to real emails or push notifications as needed.
- Does not include frontend at this moment, add a visual element as needed.
