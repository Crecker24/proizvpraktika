require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const db = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.post("/tasks", async (req, res) => {
  const { title, description = null } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Название задачи обязательно" });
  }

  if (description !== null && typeof description !== "string") {
    return res.status(400).json({ error: "Описание должно быть строкой" });
  }

  try {
    const result = await db.query(
      `INSERT INTO tasks (title, description)
       VALUES ($1, $2)
       RETURNING id, title, description, status, created_at`,
      [title.trim(), description?.trim() || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Не удалось создать задачу:", error);
    res.status(500).json({ error: "Не удалось создать задачу" });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, title, description, status, created_at FROM tasks ORDER BY id"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Не удалось получить задачи" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  const allowedStatuses = ["new", "in_progress", "done"];

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Некорректный ID задачи" });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      error: "Статус должен быть new, in_progress или done",
    });
  }

  try {
    const result = await db.query(
      `UPDATE tasks
       SET status = $1
       WHERE id = $2
       RETURNING id, title, description, status, created_at`,
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Задача не найдена" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Не удалось изменить статус задачи:", error);
    res.status(500).json({ error: "Не удалось изменить статус задачи" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Некорректный ID задачи" });
  }

  try {
    const result = await db.query("DELETE FROM tasks WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Задача не найдена" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Не удалось удалить задачу:", error);
    res.status(500).json({ error: "Не удалось удалить задачу" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Сервер запущен на http://localhost:${process.env.PORT || 3000}`);
});
