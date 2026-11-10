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

app.listen(process.env.PORT || 3000, () => {
  console.log(`Сервер запущен на http://localhost:${process.env.PORT || 3000}`);
});
