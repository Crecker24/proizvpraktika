const TASKS_URL = '/tasks'

async function request(url, options) {
  let response

  try {
    response = await fetch(url, options)
  } catch {
    throw new Error('Не удалось связаться с сервером')
  }

  const responseData = response.status === 204
    ? null
    : await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(responseData?.error || 'Произошла ошибка при работе с задачами')
  }

  return responseData
}

export function getTasks() {
  return request(TASKS_URL)
}

export function createTask(taskData) {
  return request(TASKS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  })
}

export function updateTaskStatus(id, status) {
  return request(`${TASKS_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
}

export function deleteTask(id) {
  return request(`${TASKS_URL}/${id}`, { method: 'DELETE' })
}
