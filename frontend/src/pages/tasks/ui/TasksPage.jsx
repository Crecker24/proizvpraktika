import styles from './TasksPage.module.css'
import TaskForm from '../../../features/create-task/ui/TaskForm'
import TaskList from '../../../widgets/task-list/ui/TaskList'
import Container from '../../../shared/ui/container/Container'
import {
    createTask,
    deleteTask,
    getTasks,
    updateTaskStatus,
} from '../../../entities/task/api/tasksApi'
import { useEffect, useState } from 'react'

function TasksPage() {
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
      async function loadTasks() {
        try {
          setTasks(await getTasks())
        } catch (err) {
          setError(err.message)
        } finally {
          setIsLoading(false)
        }
      }

      loadTasks()
    }, [])

    async function handleStatusChange(id, status) {
        setError('')
        try {
          const updatedTask = await updateTaskStatus(id, status)

          setTasks((currentTasks) =>
            currentTasks.map((task) => (task.id === id ? updatedTask : task))
          )
        } catch (err) {
          setError(err.message)
        }
    }

    async function handleCreateTask(taskData) {
        setError('')
        setIsCreating(true)
        try {
          const createdTask = await createTask(taskData)

          setTasks((currentTasks) => [...currentTasks, createdTask])
          return true
        } catch (err) {
          setError(err.message)
          return false
        } finally {
          setIsCreating(false)
        }
    }

    async function handleDelete(id) {
      setError('')
      try {
        await deleteTask(id)
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
      } catch (err) {
        setError(err.message)
      }
    }

    return (
        <main className={styles.page}>
            <h1 className={styles.title}>Мои задачи</h1>
            <p className={styles.subtitle}>Всё важное - в одном месте</p>

            {error && <p className={styles.errorMessage} role="alert">{error}</p>}

            <div className={styles.mainContentWrapper}>

                <section>
                    <Container>
                        <TaskForm
                            onCreateTask={handleCreateTask}
                            isSubmitting={isCreating}
                        />
                    </Container>
                </section>

                <section>
                    <Container>
                        <TaskList
                            tasks={tasks}
                            isLoading={isLoading}
                            onStatusChange={handleStatusChange}
                            onDelete={handleDelete}
                        />
                    </Container>
                </section>
            </div>
        </main>
    )
}

export default TasksPage
