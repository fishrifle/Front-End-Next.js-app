import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

const colorEnum = ["red", "blue", "green", "yellow", "purple", "pink", "gray"] as const;
const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  color: z.enum(colorEnum).default("blue"),
});
const updateTaskSchema = z.object({
  title: z.string().trim().min(1).optional(),
  color: z.enum(colorEnum).optional(),
  completed: z.boolean().optional(),
});

app.get("/", (_req: Request, res: Response) => {
  res.json({ ok: true, service: "nooro-todo-backend" });
});

app.get("/tasks", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
    res.json(tasks);
  } catch (err) { next(err); }
});

app.post("/tasks", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = createTaskSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const { title, color } = parsed.data;
    const task = await prisma.task.create({ data: { title, color } });
    res.status(201).json(task);
  } catch (err) { next(err); }
});

app.put("/tasks/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    const parsed = updateTaskSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const task = await prisma.task.update({ where: { id }, data: parsed.data });
    res.json(task);
  } catch (err) { next(err); }
});

app.delete("/tasks/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    await prisma.task.delete({ where: { id } });
    res.status(204).send();
  } catch (err) { next(err); }
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
