## Local Development setup
Create .env and update it with your database configuration.
```
POSTGRES_URL=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=332e282f3e0a0d011a8724afa9f8d86b
```

Run the following commands:
```
pnpm install
pnpm dev
```