# Habit Tracker

![CI/CD](https://github.com/merelinloni-alt/habit-tracker/actions/workflows/ci-cd.yml/badge.svg)

Учебный проект для практического занятия № 4: GitHub, GitHub Actions и Cloudflare Pages.

## Структура

- `src/app.py` — функция `calculate_streak`, считает непрерывную серию успешных отметок с конца истории (максимум 365).
- `tests/` — автоматические тесты pytest.
- `web/` — статическая страница Habit Tracker.
- `.github/workflows/ci-cd.yml` — CI-проверка и CD-деплой.
- `requirements.txt` и `requirements-dev.txt` — зависимости.

## Запуск тестов локально

```bash
python -m pip install -r requirements.txt -r requirements-dev.txt
python -m pytest -v
```

## GitHub Actions и Cloudflare Pages

Workflow запускает `test` при push в `main` и при Pull Request в `main`.
Задача `deploy` зависит от `test` через `needs: test` и запускается только при push в `main`.
Для деплоя в настройках репозитория GitHub добавьте Actions secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Cloudflare Pages project name: `habit-tracker`; публикуемая папка: `web`.

## Практика

Пошаговая инструкция и команды для заданий 2–9 находятся в `docs/PRACTICE-4-GUIDE.md`.
