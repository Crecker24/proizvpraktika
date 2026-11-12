import styles from './TasksPage.module.css'
import TaskForm from '../../../features/create-task/ui/TaskForm'
import Container from '../../../shared/ui/container/Container'

function TasksPage() {
    return (
        <main className={styles.page}>
            <h1 className={styles.title}>Мои задачи</h1>
            <p className={styles.subtitle}>Всё важное - в одном месте</p>

            <section>
                <Container>
                    <TaskForm/>
                </Container>
            </section>

            <section>
                <h2>Список задач</h2>
            </section>
        </main>
    )
}

export default TasksPage