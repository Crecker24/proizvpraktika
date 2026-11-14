import styles from './TaskList.module.css'

const statusOptions = [
  { value: 'new', label: 'Новая' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'done', label: 'Готово' },
]

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

function formatTaskDate(value) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return dateFormatter.format(date)
}

function getTaskCountLabel(count) {
  const lastTwoDigits = count % 100
  const lastDigit = count % 10

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'задач'
  if (lastDigit === 1) return 'задача'
  if (lastDigit >= 2 && lastDigit <= 4) return 'задачи'
  return 'задач'
}

function TaskList({ tasks = [], isLoading = false, onStatusChange, onDelete }) {
  return (
    <section>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>Ваш список задач</h2>
        <p className={styles.countOfTask}>
          {tasks.length} {getTaskCountLabel(tasks.length)}
        </p>
      </div>

      {isLoading ? (
        <p className={styles.zeroTask}>Загружаем задачи…</p>
      ) : tasks.length === 0 ? (
        <p className={styles.zeroTask}>У вас нет задач</p>
      ) : (
        <div className={styles.gridTable}>
          <div className={styles.tableHeader}>
            <span>Название</span>
            <span>Статус</span>
            <span>Дата создания</span>
            <span aria-hidden="true" />
          </div>

          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <li className={styles.taskRow} key={task.id}>
                <div className={styles.taskInfo}>
                  <p className={styles.taskTitle}>{task.title}</p>
                  {task.description && (
                    <p className={styles.taskDescription}>{task.description}</p>
                  )}
                </div>

                <div className={styles.statusControl}>
                  <select
                    className={styles.statusSelect}
                    value={task.status}
                    aria-label={`Статус задачи ${task.title}`}
                    onChange={(event) =>
                      onStatusChange?.(task.id, event.target.value)
                    }
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <span className={styles.chevron} aria-hidden="true" />
                </div>

                <time dateTime={task.created_at}>
                  {formatTaskDate(task.created_at)}
                </time>

                <button
                  className={styles.deleteButton}
                  type="button"
                  aria-label={`Удалить задачу ${task.title}`}
                  onClick={() => onDelete?.(task.id)}
                >
                  <span className={styles.closeIcon} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default TaskList
