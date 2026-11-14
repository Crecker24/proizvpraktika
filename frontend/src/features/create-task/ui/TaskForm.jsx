import styles from "./TaskForm.module.css"
import { useState } from "react"

function TaskForm({ onCreateTask, isSubmitting = false }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()

        if (!title.trim()) return

        const wasCreated = await onCreateTask({
            title: title.trim(),
            description: description.trim(),
        })

        if (wasCreated) {
            setTitle("")
            setDescription("")
        }
    }

    return (
        <>
            <h2 className={styles.title}>Новая задача</h2>
            <p className={styles.subtitle}>Опишите, что нужно сделать</p>
            <form className={styles.formWrapper} onSubmit={handleSubmit}>
                <label className={styles.formField} htmlFor="title">
                    Название
                    <input
                        id="title"
                        name="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Например, подготовить презентацию"
                        required
                    />
                </label>
                <label className={styles.formField} htmlFor="description">
                    Описание
                    <textarea
                        name="description"
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Добавьте детали задачи"
                        rows={3}
                    />
                </label>
                <button
                    className={styles.submitButton}
                    type="submit"    
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Добавляем…' : '+ Добавить задачу'}
                </button>
            </form>
        </>
    )
}

export default TaskForm
