# S59 FSAD Frontend

React + Vite frontend for the project dashboard/application.

## Requirements

- Node.js `20.19.0` or later
- npm `10` or later

## Run locally

From this `frontend` folder:

```bash
npm install
npm run dev
```

## Build and lint

```bash
npm run lint
npm run build
```

The production output is generated in `frontend/dist`.

## Deploy notes (GitHub / CI)

- Install dependencies in `frontend`.
- Build command: `npm run build` (inside `frontend`) or from repo root: `npm run build`.
- Node version in CI should be `20.19.0` (or higher compatible version).

## Common deployment issue fixed

If deployment fails due to unexpected local package links, ensure `frontend/package.json` does **not** include any dependency like:

```json
"s59-fsad": "file:.."
```

That local link dependency has been removed in this fix.
