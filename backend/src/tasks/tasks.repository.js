const db = require('../config/database')

async function create({ title, description }) {
  const result = await db.query(
    `INSERT INTO tasks (title, description)
     VALUES ($1, $2)
     RETURNING id, title, description, status, created_at`,
    [title, description]
  )

  return result.rows[0]
}

async function findAll() {
  const result = await db.query(
    'SELECT id, title, description, status, created_at FROM tasks ORDER BY id'
  )

  return result.rows
}

async function updateStatus(id, status) {
  const result = await db.query(
    `UPDATE tasks
     SET status = $1
     WHERE id = $2
     RETURNING id, title, description, status, created_at`,
    [status, id]
  )

  return result.rows[0] || null
}

async function remove(id) {
  const result = await db.query('DELETE FROM tasks WHERE id = $1', [id])
  return result.rowCount > 0
}

module.exports = {
  create,
  findAll,
  updateStatus,
  remove,
}
