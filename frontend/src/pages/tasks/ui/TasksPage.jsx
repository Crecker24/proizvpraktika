import styles from './TasksPage.module.css'
import TaskForm from '../../../features/create-task/ui/TaskForm'
import TaskList from '../../../widgets/task-list/ui/TaskList'
import Container from '../../../shared/ui/container/Container'
import { useEffect, useState } from 'react'

function TasksPage() {
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
      async function loadTasks() {
        try {
          const response = await fetch('/tasks')
          if (!response.ok) throw new Error('Не удалось загрузить задачи')
          setTasks(await response.json())
        } catch (err) {
          setError(err.message || 'Не удалось связаться с сервером')
        } finally {
          setIsLoading(false)
        }
      }

      loadTasks()
    }, [])

    async function handleStatusChange(id, status) {
        setError('')
        try {
          const response = await fetch(`/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
          })
          const result = await response.json()
          if (!response.ok) throw new Error(result.error || 'Не удалось изменить статус')

          setTasks((currentTasks) =>
            currentTasks.map((task) => (task.id === id ? result : task))
          )
        } catch (err) {
          setError(err.message || 'Не удалось связаться с сервером')
        }
    }

    async function handleCreateTask(taskData) {
        setError('')
        setIsCreating(true)
        try {
          const response = await fetch('/tasks', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(taskData),
          })
          const result = await response.json()
          if (!response.ok) throw new Error(result.error || 'Не удалось создать задачу')

          setTasks((currentTasks) => [...currentTasks, result])
          return true
        } catch (err) {
          setError(err.message || 'Не удалось связаться с сервером')
          return false
        } finally {
          setIsCreating(false)
        }
    }

    async function handleDelete(id) {
      setError('')
      try {
        const response = await fetch(`/tasks/${id}`, { method: 'DELETE' })
        if (!response.ok) {
          const result = await response.json()
          throw new Error(result.error || 'Не удалось удалить задачу')
        }
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
      } catch (err) {
        setError(err.message || 'Не удалось связаться с сервером')
      }
    }

    return (
        <main className={styles.page}>
            <h1 className={styles.title}>Мои задачи</h1>
            <p className={styles.subtitle}>Всё важное - в одном месте</p>

            {error && <p className={styles.errorMessage} role="alert">{error}</p>}

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
        </main>
    )
}

export default TasksPage
