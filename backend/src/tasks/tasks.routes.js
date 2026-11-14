const express = require('express')
const tasksController = require('./tasks.controller')

const router = express.Router()

router.get('/', tasksController.getTasks)
router.post('/', tasksController.createTask)
router.put('/:id', tasksController.updateTaskStatus)
router.delete('/:id', tasksController.deleteTask)

module.exports = router
