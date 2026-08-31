# Локальный запуск CI

## Установка act

```bash
# macOS
brew install act

# Linux
curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | bash
```

## Команды

| Команда | Описание |
|---|---|
| `pnpm ci:act` | Полный запуск workflow в Docker |
| `pnpm ci:act:dry` | Dry-run mode (покажет план без выполнения) |
| `pnpm ci:generate` | `nuxt generate` |
| `pnpm ci:verify` | Проверка build output |
| `pnpm test` | Smoke tests (generate + assertions) |

## Husky хуки

- **pre-commit** — `pnpm lint`
- **pre-push** — `pnpm ci:generate && pnpm ci:verify`

При падении pre-push хука — запусти `git push --no-verify` для пропуска.