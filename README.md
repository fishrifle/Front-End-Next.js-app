# Nooro Todo Backend (Express + Prisma + MySQL, TypeScript)

## Quick Start
```bash
cp .env.example .env
docker compose up -d
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```
API: http://localhost:4000

### Endpoints
- GET /tasks
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id
