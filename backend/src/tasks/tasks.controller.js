const tasksRepository = require('./tasks.repository')

const allowedStatuses = ['new', 'in_progress', 'done']

async function createTask(req, res) {
  const { title, description = null } = req.body

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Название задачи обязательно' })
  }

  if (description !== null && typeof description !== 'string') {
    return res.status(400).json({ error: 'Описание должно быть строкой' })
  }

  try {
    const task = await tasksRepository.create({
      title: title.trim(),
      description: description?.trim() || null,
    })
    return res.status(201).json(task)
  } catch (error) {
    console.error('Не удалось создать задачу:', error)
    return res.status(500).json({ error: 'Не удалось создать задачу' })
  }
}

async function getTasks(_req, res) {
  try {
    const tasks = await tasksRepository.findAll()
    return res.json(tasks)
  } catch (error) {
    console.error('Не удалось получить задачи:', error)
    return res.status(500).json({ error: 'Не удалось получить задачи' })
  }
}

async function updateTaskStatus(req, res) {
  const id = Number(req.params.id)
  const { status } = req.body

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Некорректный ID задачи' })
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      error: 'Статус должен быть new, in_progress или done',
    })
  }

  try {
    const task = await tasksRepository.updateStatus(id, status)
    if (!task) return res.status(404).json({ error: 'Задача не найдена' })
    return res.json(task)
  } catch (error) {
    console.error('Не удалось изменить статус задачи:', error)
    return res.status(500).json({ error: 'Не удалось изменить статус задачи' })
  }
}

async function deleteTask(req, res) {
  const id = Number(req.params.id)

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Некорректный ID задачи' })
  }

  try {
    const deleted = await tasksRepository.remove(id)
    if (!deleted) return res.status(404).json({ error: 'Задача не найдена' })
    return res.status(204).send()
  } catch (error) {
    console.error('Не удалось удалить задачу:', error)
    return res.status(500).json({ error: 'Не удалось удалить задачу' })
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
}
