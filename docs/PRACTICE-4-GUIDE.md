# Практика № 4 — пошаговое выполнение

Репозиторий уже создан: `merelinloni-alt/habit-tracker`. Эта папка содержит готовые файлы проекта. Действия, требующие входа в GitHub и Cloudflare, нужно выполнить в браузере самостоятельно.

## Перед началом

Распакуйте проект в локальную папку `~/habit-tracker` (ту, где уже настроен `origin`). Не создавайте второй репозиторий. Затем в Git Bash:

```bash
cd ~/habit-tracker
git status
```

Скопируйте файлы из архива в эту папку с сохранением структуры. После проверки:

```bash
git add .
git commit -m "feat: add Habit Tracker frontend, tests and CI/CD"
git push
```

## Задание 2 — HTML и Pull Request

Если файлы ещё не добавлены в `main`, создайте ветку:

```bash
git switch -c feature/landing-page
```

Добавьте `web/` из этого комплекта, затем:

```bash
git add web
git commit -m "feat: add static landing page"
git push -u origin feature/landing-page
```

На GitHub откройте Compare & pull request → Create pull request. Проверьте Files changed и выполните Merge pull request. Затем:

```bash
git switch main
git pull
```

Если весь комплект уже закоммичен в `main`, задание с PR можно показать отдельным небольшим изменением в `web/`, чтобы PR действительно был создан и смержен.

## Задание 3 — Cloudflare Pages (Direct Upload)

1. Войдите в Cloudflare: https://dash.cloudflare.com/
2. Workers & Pages → Create application → Pages → Upload assets.
3. Название проекта: `habit-tracker`.
4. Загрузите именно содержимое папки `web/`: `index.html`, `style.css`, `app.js`.
5. После публикации сохраните URL `https://habit-tracker-....pages.dev`, Account ID и API Token. Не вставляйте токен в файлы проекта и не отправляйте его в чат.

Не подключайте встроенную кнопку Connect to Git: по заданию деплой будет запускаться через собственный GitHub Actions workflow.

## Задание 4 — CI/CD (теория)

- CI (Continuous Integration): автоматическая проверка изменений тестами при push и Pull Request.
- CD (Continuous Delivery/Deployment): доставка проверенного кода в рабочее окружение.
- `workflow`: YAML-файл процесса.
- `event` (`on`): событие-триггер.
- `job`: отдельная задача workflow.
- `needs`: зависимость между задачами; следующая задача ждёт успешного завершения предыдущей.
- `step`: команда `run` или готовое действие `uses`.
- `runner`: виртуальная машина, выполняющая job.
- `secret`: зашифрованное значение, например токен.

## Задание 5 — тесты и CI

В проекте уже есть `tests/test_app.py`, `requirements-dev.txt` и job `test`. Проверь локально:

```bash
python -m pip install -r requirements.txt -r requirements-dev.txt
python -m pytest -v
```

Все тесты должны пройти. Для демонстрации PR можно создать ветку:

```bash
git switch -c feature/add-tests
git add tests requirements-dev.txt
git commit -m "test: add unit tests for calculate_streak"
git push -u origin feature/add-tests
```

Откройте и смержите PR на GitHub, затем обновите локальную `main`:

```bash
git switch main
git pull
```

Затем добавьте workflow в отдельной ветке, если он ещё не в `main`:

```bash
git switch -c feature/ci-workflow
git add .github/workflows/ci-cd.yml
git commit -m "ci: add test workflow"
git push -u origin feature/ci-workflow
```

Создайте PR и смержите его. Вкладка Actions должна показать успешный job `test`.

## Задание 6 — Cloudflare deploy

В GitHub откройте Settings → Secrets and variables → Actions → New repository secret. Добавьте два секрета (значения берутся из Cloudflare):

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Не публикуйте эти значения. В `.github/workflows/ci-cd.yml` уже добавлен job `deploy`: он зависит от `test`, запускается только на push в `main` и публикует папку `web` в проект `habit-tracker`.

Создайте PR с workflow, смержите его в `main` и проверьте Actions. Сначала должен пройти `test`, затем `deploy`. После этого обновите адрес Pages.

## Задание 7 — намеренно провалить тест и проверить блокировку deploy

Работайте только в отдельной ветке:

```bash
git switch main
git pull
git switch -c feature/break-on-purpose
```

В `src/app.py` временно замените последнюю строку функции `return min(streak, 365)` на `return streak`. Затем:

```bash
git add src/app.py
git commit -m "refactor(streak): remove cap (oops)"
git push -u origin feature/break-on-purpose
```

Создайте PR. Тест `test_streak_is_capped_at_365` должен упасть. Так как это Pull Request, deploy не запускается. Кроме того, `needs: test` не позволит deploy продолжиться при проваленном test.

Исправьте строку обратно на `return min(streak, 365)`, затем:

```bash
git add src/app.py
git commit -m "fix: restore 365-day cap"
git push
```

Проверьте, что тесты стали зелёными, и смержите PR. Убедитесь, что после push в `main` прошли `test` и `deploy`.

## Задание 8 — бейдж

В начале `README.md` уже находится бейдж:

```markdown
![CI/CD](https://github.com/merelinloni-alt/habit-tracker/actions/workflows/ci-cd.yml/badge.svg)
```

Если workflow ещё не запускался, бейдж может быть серым или неизвестным. После успешного запуска Actions обновите страницу репозитория.

## Задание 9 — итоговая проверка и рефлексия

Проверьте, что репозиторий содержит `src/app.py`, `tests/`, `web/`, `requirements*.txt`, `.gitignore`, `.github/workflows/ci-cd.yml`; Actions показывает успешные `test → deploy`; сайт Cloudflare Pages открывается; README показывает бейдж.

### Ответы для письменной рефлексии

**1. В чём разница между CI и CD?**  
CI автоматически проверяет новые изменения и запускает тесты, чтобы ошибки находились до слияния кода. CD доставляет успешно проверенную версию приложения в рабочее окружение.

**2. Почему deploy зависит от test через needs?**  
`needs: test` задаёт реальную зависимость между задачами. Деплой начнётся только после успешного завершения тестов, а не просто потому, что job написан ниже в YAML.

**3. Что будет, если убрать needs?**  
Задачи могут выполняться независимо, и публикация может начаться до завершения тестов. В результате на сайт может попасть версия с ошибками, даже если тесты позже завершатся неудачно.

---

## Важное ограничение

Локальные файлы и workflow подготовлены в этом комплекте, но создать Cloudflare API Token, добавить GitHub Secrets, выполнить Pull Request и реально опубликовать сайт можно только из твоих аккаунтов. Секретные ключи не помещаются в архив.
