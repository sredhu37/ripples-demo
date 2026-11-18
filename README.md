# Ripples demo

Ripples is a kids' money and economics app: lessons told by Otto the otter, in English, German and Polish. This repository is the starting point for a hands-on demo: containerize the app, then deploy it on GCP and GKE, one stage at a time.

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-Ko--fi-FF5E5B?logo=kofi&logoColor=white)](https://ko-fi.com/sunnyredhu)

## Run it locally

You need Node.js 22.12 or newer and npm.

```bash
npm ci
npm run dev
```

Other commands: `npm run test`, `npm run lint`, `npm run typecheck`, `npm run build`.

## Follow along

`main` holds the plain application code, with no Dockerfile or deploy files. Each stage of the demo is a branch named `v1`, `v2`, and so on. Check one out to see the repository as it is at the end of that stage:

```bash
git checkout v1
```

Compare two stages to see exactly what a step added: `https://github.com/sredhu37/ripples-demo/compare/v1...v2`.

Version branches are frozen. They cannot be changed or deleted after they are created.

## Licence

The code is PolyForm Noncommercial and the lesson content is CC BY-NC-ND. Containerizing it, deploying it to your own cluster and practising DevOps on it is fine. See [LICENSING.md](LICENSING.md).

## Support

If this saved you time, you can [buy me a coffee](https://ko-fi.com/sunnyredhu).
