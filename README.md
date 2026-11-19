# Ripples demo

Ripples is a kids' money and economics app: lessons told by Otto the otter, in English, German and Polish. This repository is the starting point for a hands-on demo: containerize the app, then deploy it on GCP and GKE, one stage at a time.

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-Ko--fi-FF5E5B?logo=kofi&logoColor=white)](https://ko-fi.com/sunnyredhu)

## Run it locally

```
browser -> React app (Vite :5173) -> /api -> Go API (:8080) -> MySQL (:3306)
```

### Prerequisites

- Node.js 26 (current LTS), with npm
- Go 1.24 or newer
- MySQL 8.4

On macOS with Homebrew:

```bash
brew install node go mysql@8.4
```

### Run locally

Start the database, then load the schema and the data. `db/seed.sql` is the source of truth for all curriculum text.

```bash
export PATH="$(brew --prefix mysql@8.4)/bin:$PATH"
brew services start mysql@8.4

mysql -u root -e "CREATE DATABASE ripples; CREATE USER 'ripples'@'localhost' IDENTIFIED BY 'ripples'; GRANT ALL ON ripples.* TO 'ripples'@'localhost';"
mysql -u ripples -pripples ripples < db/schema.sql
mysql -u ripples -pripples ripples < db/seed.sql
```

Start the backend service. `MYSQL_DSN` is `user:password@tcp(host:port)/database`; `PORT` defaults to 8080.

```bash
cd backend
MYSQL_DSN='ripples:ripples@tcp(localhost:3306)/ripples' go run .
```

Start the frontend in another terminal. Vite forwards `/api` to `localhost:8080`.

```bash
npm ci
npm run dev
```

Open http://localhost:5173. Without the backend running, the app shows "Can't reach Ripples right now".

## Tests and checks

- Frontend: `npm run test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run check:bundle` (after a build: fails if curriculum text ended up in the bundle).
- Backend: `cd backend && go test ./...`. With `MYSQL_DSN` set, the tests also check the loaded data (counts, at least 5 sourced claims per lesson, links between tables).

## API

All endpoints are read-only.

| Endpoint                      | Returns                                                                    |
| ----------------------------- | -------------------------------------------------------------------------- |
| `GET /api/groups`             | Groups in order, each with its lessons (`position` is the save-code order) |
| `GET /api/facts`              | Every lesson's fact card                                                   |
| `GET /api/lessons/{id}/facts` | One lesson's fact card, 404 if unknown                                     |
| `GET /api/timeline`           | Eras, regions, events and meanwhile cards                                  |
| `GET /api/healthz`            | `ok` when MySQL answers, 503 otherwise                                     |

## Licence

The code is PolyForm Noncommercial and the lesson content is CC BY-NC-ND. Containerizing it, deploying it to your own cluster and practising DevOps on it is fine. See [LICENSING.md](LICENSING.md).

## Support

If this saved you time, you can [buy me a coffee](https://ko-fi.com/sunnyredhu).
