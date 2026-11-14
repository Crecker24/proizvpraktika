# Task Manager

Это сайт для работы с задачами. В нём можно добавить задачу, посмотреть список, изменить статус и удалить задачу.

## Файлы проекта

- `backend/server.js` запускает сервер.
- `backend/src/app.js` настраивает Express.
- `backend/src/config/database.js` подключает PostgreSQL.
- `backend/src/tasks/tasks.routes.js` задаёт адреса запросов.
- `backend/src/tasks/tasks.controller.js` обрабатывает запросы и отправляет ответы.
- `backend/src/tasks/tasks.repository.js` выполняет команды к базе данных.
- `backend/package.json` и `backend/package-lock.json` нужны для зависимостей backend.
- `backend/.env` хранит настройки PostgreSQL. В Git этот файл не добавляется.
- `backend/Dockerfile` описывает запуск backend в Docker.
- `backend/.dockerignore` исключает лишние файлы при сборке backend.
- `database/001_create_tasks.sql` создаёт таблицу задач.
- `docker-compose.yml` запускает сайт, сервер и PostgreSQL вместе.
- `frontend/index.html` — главная HTML-страница сайта.
- `frontend/src/main.jsx` запускает React-приложение.
- `frontend/src/App.jsx` подключает страницу задач.
- `frontend/src/App.css` содержит общие стили сайта.
- `frontend/src/app/styles/reset.css` сбрасывает стандартные стили браузера.
- `frontend/src/pages/tasks/ui/TasksPage.jsx` собирает страницу и обрабатывает действия с задачами.
- `frontend/src/pages/tasks/ui/TasksPage.module.css` задаёт стили страницы.
- `frontend/src/features/create-task/ui/TaskForm.jsx` показывает форму добавления задачи.
- `frontend/src/features/create-task/ui/TaskForm.module.css` задаёт стили формы.
- `frontend/src/widgets/task-list/ui/TaskList.jsx` показывает список задач.
- `frontend/src/widgets/task-list/ui/TaskList.module.css` задаёт стили списка.
- `frontend/src/entities/task/api/tasksApi.js` отправляет запросы с сайта на сервер.
- `frontend/src/shared/ui/container/Container.jsx` задаёт общий контейнер для частей сайта.
- `frontend/src/shared/ui/container/Container.module.css` задаёт стили контейнера.
- `frontend/vite.config.js` настраивает запуск сайта и связь с backend.
- `frontend/eslint.config.js` содержит настройки проверки кода.
- `frontend/package.json` и `frontend/package-lock.json` нужны для зависимостей frontend.
- `frontend/.gitignore` исключает временные файлы frontend из Git.
- `frontend/Dockerfile` описывает запуск frontend в Docker.
- `frontend/.dockerignore` исключает лишние файлы при сборке frontend.
- `frontend/public/icons.svg` содержит значки сайта.
- `frontend/public/favicon.svg` содержит значок вкладки браузера.
- `scripts/export_tasks.py` сохраняет задачи из базы в CSV.
- `scripts/requirements.txt` содержит библиотеки для Python-скрипта.
- `.gitignore` исключает секретные и временные файлы из Git.
- `README.md` содержит описание проекта и команды для запуска.

В проекте используются React, Node.js, Express, PostgreSQL и Python.

## Что нужно установить

- Node.js и npm
- Python
- PostgreSQL
- Docker Desktop, если запускаешь проект через Docker

## Подготовка базы данных

Создай в PostgreSQL базу с именем `task_manager`. Затем из главной папки проекта выполни команду:

```powershell
psql -U postgres -d task_manager -f database/001_create_tasks.sql
```

Команда создаст таблицу `tasks`.

Создай файл `backend/.env` и укажи в нём данные для подключения к своей базе:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager
DB_USER=postgres
DB_PASSWORD=твой_пароль
```

Вместо `твой_пароль` укажи пароль PostgreSQL. Не отправляй файл `.env` в Git, потому что в нём находится пароль.

## Установка

Команды нужно выполнить из главной папки проекта:

```powershell
cd backend
npm install
cd ../frontend
npm install
cd ..
py -m pip install -r scripts/requirements.txt
```

## Запуск без Docker

Открой два терминала в главной папке проекта.

В первом запусти сервер:

```powershell
cd backend
npm run dev
```

Во втором запусти сайт:

```powershell
cd frontend
npm run dev
```

Открой адрес, который появится во втором терминале. Обычно это `http://localhost:5173`.

## Запуск через Docker

Запусти Docker Desktop. Затем из главной папки проекта выполни:

```powershell
docker compose up --build -d
```

Открой сайт по адресу `http://localhost:5174`. Docker запускает сайт, сервер и отдельную базу данных. Эта база отличается от PostgreSQL, установленного в Windows. Данные Docker-базы сохраняются, когда контейнеры остановлены.

Показать запущенные контейнеры:

```powershell
docker ps
```

Показать логи:

```powershell
docker compose logs
```

Остановить контейнеры:

```powershell
docker compose down
```

Эта команда не удаляет данные базы. Пароль в `docker-compose.yml` предназначен только для локального учебного запуска.

## Проверка работы

На сайте добавь задачу, измени её статус и удали её.

Чтобы получить список задач через API, при запущенном backend выполни в PowerShell:

```powershell
Invoke-RestMethod -Method Get -Uri http://localhost:3000/tasks
```

## Сохранение задач в CSV

Убедись, что PostgreSQL запущен и файл `backend/.env` заполнен. Из главной папки проекта выполни:

```powershell
py scripts/export_tasks.py
```

CSV-файл появится в `exports/tasks.csv`. Чтобы задать другое имя файла, выполни:

```powershell
py scripts/export_tasks.py --output exports/my_tasks.csv
```

## Команды Git

```powershell
git status
git add .
git commit -m "Описание изменений"
git push
```
