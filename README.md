# Task Manager

Это сайт для работы с задачами. В нём можно добавить задачу, посмотреть список, изменить статус и удалить задачу.

## Что находится в папках

- backend — сервер сайта.
  - server.js запускает сервер.
  - src/app.js настраивает сервер.
  - src/config/database.js подключает базу данных.
  - src/tasks/tasks.routes.js содержит адреса запросов.
  - src/tasks/tasks.controller.js обрабатывает запросы.
  - src/tasks/tasks.repository.js выполняет запросы к базе данных.
  - .env хранит настройки базы данных.
- database — SQL-файл для создания таблицы задач.
- frontend — сайт, который открывается в браузере.
  - src/pages содержит страницу задач.
  - src/features содержит форму добавления задачи.
  - src/widgets содержит список задач.
  - src/entities содержит запросы сайта к серверу.
  - src/shared содержит общие части сайта.
- scripts — Python-скрипт, который сохраняет задачи в CSV.
- .gitignore — список файлов, которые Git не добавляет в проект.
- README.md — описание проекта и команды для запуска.

В проекте используются React, Node.js, Express, PostgreSQL и Python.

## Что нужно установить

- Node.js и npm
- Python
- PostgreSQL

## Подготовка базы данных

Создай в PostgreSQL базу с именем task_manager. Затем из главной папки проекта выполни команду:

powershell
psql -U postgres -d task_manager -f database/001_create_tasks.sql


Команда создаст таблицу tasks.

Создай файл backend/.env и укажи в нём данные для подключения к своей базе:

env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager
DB_USER=postgres
DB_PASSWORD=твой_пароль


Вместо твой_пароль укажи пароль PostgreSQL. Не отправляй файл .env в Git, потому что в нём находится пароль.

## Установка

Команды нужно выполнить из главной папки проекта:

powershell
cd backend
npm install
cd ../frontend
npm install
cd ..
py -m pip install -r scripts/requirements.txt


## Запуск

Открой два терминала в главной папке проекта.

В первом запусти сервер:

powershell
cd backend
npm run dev


Во втором запусти сайт:

powershell
cd frontend
npm run dev


Открой адрес сайта, который появится во втором терминале. Обычно это http://localhost:5173.

## Как проверить работу

На сайте добавь задачу, измени её статус и удали её.

Можно отдельно проверить сервер. При запущенном backend выполни в PowerShell:

powershell
Invoke-RestMethod -Method Get -Uri http://localhost:3000/tasks


Команда покажет список задач.

## Сохранение задач в CSV

Убедись, что PostgreSQL запущен и файл backend/.env заполнен. Из главной папки проекта выполни:

powershell
py scripts/export_tasks.py


Файл с задачами появится в exports/tasks.csv. Чтобы указать другое имя файла, выполни:

powershell
py scripts/export_tasks.py --output exports/my_tasks.csv


## Команды Git

powershell
git status
git add .
git commit -m "Описание изменений"
git push