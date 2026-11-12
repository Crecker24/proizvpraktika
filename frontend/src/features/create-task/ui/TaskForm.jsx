import styles from "./TaskForm.module.css"

function TaskForm() {
    return (
        <>
            <h2 className={styles.title}>Новая задача</h2>
            <p className={styles.subtitle}>Опишите, что нужно сделать</p>
            <form className={styles.formWrapper}>
                <label className={styles.formField} htmlFor="title">
                    Название
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Например, подготовить презентацию"
                    />
                </label>
                <label className={styles.formField} htmlFor="description">
                    Описание
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Добавьте детали задачи"
                        rows={3}
                    />
                </label>
                <button
                    className={styles.submitButton}
                    type="submit"    
                >
                    + Добавить задачу
                </button>
            </form>
        </>
    )
}

export default TaskForm