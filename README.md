Todo Backend (Express + Prisma + MySQL + TypeScript)

This is the backend API for the Todo List App take-home project.
It provides REST endpoints for managing tasks and connects to a MySQL database via Prisma.

Features

REST API with CRUD operations for tasks

Each task has: id, title, color, completed, createdAt, updatedAt

Prisma schema & migrations included

MySQL database (Dockerized for local development)

TypeScript + Express setup with validation and error handling

CORS enabled for frontend requests

Tech Stack

Express.js

Prisma ORM

MySQL

TypeScript

Docker

Getting Started
1. Install dependencies
npm install

2. Configure environment variables

Copy the example file:

cp .env.example .env


Default values:

DATABASE_URL="mysql://root:rootpassword@localhost:3306/nooro_todo?connection_limit=5"
PORT=4000
CORS_ORIGIN="http://localhost:3000"

3. Start MySQL with Docker
docker compose up -d

4. Run Prisma
npm run prisma:generate
npm run prisma:migrate

5. Start the server
npm run dev


The API will run at http://localhost:4000
.

API Endpoints

GET /tasks → list all tasks

POST /tasks → create task ({ title, color })

PUT /tasks/:id → update task ({ title?, color?, completed? })

DELETE /tasks/:id → delete task