# Realestate Frontend

## Environment

Create a `.env` file from `.env.example`.

```bash
cp .env.example .env
```

Set:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

If `VITE_API_BASE_URL` is not set, local development falls back to `http://localhost:8000`.

## Development

```bash
npm install
npm run dev
```

Current backend expected during integration:

```text
http://localhost:8000
```
