import argparse
import csv
import os
import sys
from pathlib import Path

import psycopg
from dotenv import load_dotenv


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = PROJECT_ROOT / "exports" / "tasks.csv"
TASK_COLUMNS = ("id", "title", "description", "status", "created_at")


def export_tasks(output_path: Path) -> int:
    env_path = PROJECT_ROOT / "backend" / ".env"
    load_dotenv(env_path)

    required_settings = ("DB_HOST", "DB_NAME", "DB_USER", "DB_PASSWORD")
    missing_settings = [name for name in required_settings if not os.getenv(name)]
    if missing_settings:
        names = ", ".join(missing_settings)
        raise ValueError(f"Не заданы параметры PostgreSQL: {names} (проверьте {env_path})")

    connection_settings = {
        "host": os.getenv("DB_HOST"),
        "port": int(os.getenv("DB_PORT", "5432")),
        "dbname": os.getenv("DB_NAME"),
        "user": os.getenv("DB_USER"),
        "password": os.getenv("DB_PASSWORD"),
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)

    with psycopg.connect(**connection_settings) as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, title, description, status, created_at
                FROM tasks
                ORDER BY id
                """
            )
            rows = cursor.fetchall()

    with output_path.open("w", newline="", encoding="utf-8-sig") as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(TASK_COLUMNS)
        writer.writerows(rows)

    return len(rows)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Выгружает задачи из PostgreSQL в CSV-файл."
    )
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        default=DEFAULT_OUTPUT,
        help=f"путь к CSV (по умолчанию: {DEFAULT_OUTPUT})",
    )
    args = parser.parse_args()

    try:
        count = export_tasks(args.output)
    except (ValueError, OSError, psycopg.Error) as error:
        print(f"Ошибка экспорта: {error}", file=sys.stderr)
        return 1

    print(f"Экспортировано задач: {count}")
    print(f"CSV-файл: {args.output.resolve()}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
