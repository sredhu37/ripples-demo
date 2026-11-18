# Ripples demo

Ripples is a kids' money and economics app: lessons told by Otto the otter, in English, German and Polish. This repository is the starting point for a hands-on demo: containerize the app, then deploy it on GCP and GKE, one stage at a time.

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-Ko--fi-FF5E5B?logo=kofi&logoColor=white)](https://ko-fi.com/sunnyredhu)

## Run it locally

You need Node.js 22.12 or newer and npm.

```bash
npm ci
npm run dev
```

Other commands: `npm run test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run check:bundle` (after a build: fails if curriculum text ended up in the bundle).

`npm run dev` alone shows "Can't reach Ripples right now": the lesson titles, fact cards and timeline come from the API. Run the full stack below.

## Run the full stack

```
browser -> React app (Vite :5173) -> /api -> Go API (:8080) -> MySQL (:3306)
```

You need Go 1.24 or newer and MySQL 8.4.

1. Create a database and a user, for example `ripples` / `ripples`.
2. Load the schema, then the data. `db/seed.sql` is the source of truth for all curriculum text.

   ```bash
   mysql -u ripples -p ripples < db/schema.sql
   mysql -u ripples -p ripples < db/seed.sql
   ```

3. Start the API. `MYSQL_DSN` is `user:password@tcp(host:port)/database`; `PORT` defaults to 8080.

   ```bash
   cd backend
   MYSQL_DSN='ripples:ripples@tcp(localhost:3306)/ripples' go run .
   ```

4. In another terminal, `npm run dev`. Vite forwards `/api` to `localhost:8080`.

API, all read-only:

| Endpoint | Returns |
|---|---|
| `GET /api/groups` | Groups in order, each with its lessons (`position` is the save-code order) |
| `GET /api/facts` | Every lesson's fact card |
| `GET /api/lessons/{id}/facts` | One lesson's fact card, 404 if unknown |
| `GET /api/timeline` | Eras, regions, events and meanwhile cards |
| `GET /api/healthz` | `ok` when MySQL answers, 503 otherwise |

Backend tests: `cd backend && go test ./...`. With `MYSQL_DSN` set, they also check the loaded data (counts, at least 5 sourced claims per lesson, links between tables).

## Licence

The code is PolyForm Noncommercial and the lesson content is CC BY-NC-ND. Containerizing it, deploying it to your own cluster and practising DevOps on it is fine. See [LICENSING.md](LICENSING.md).

## Support

If this saved you time, you can [buy me a coffee](https://ko-fi.com/sunnyredhu).
