const express = require('express')
const taskRoutes = require('./tasks/tasks.routes')

const app = express()

app.use(express.json())
app.use('/tasks', taskRoutes)

module.exports = app
