# Weather API

Get weather info, subscribe to weather updates

Stack: NodeJS, NestJS, PostgreSQL, drizzle, [Mailersend](https://www.mailersend.com/)

Deployed on Render: https://genesis-ses5-case.onrender.com/

> Note: deplyment uses free tier of `Mailersend` and it allows sending emails only to the admin email

## Setup

- NodeJS: >=20
- npm: >=10

```bash
# 0. create .env, update variables
cp .env.example .env

# 1. install dependencies
npm i

# 2. start db (runs in docker)
npm run db:dev

# 3. apply db migrations
npm run db:migr
# or
npm run db:push

# start the app
npm run start:dev
```

### Docker

```bash
docker compose up --build
```

### Bruno

`.bruno` is a [Bruno](https://www.usebruno.com/) collection with defined API requests

```bash
# create env, update variables
cp .bruno/.env.example .bruno/.env
```

## About

App is build using NestJS framework.

API (`src/api` module) has two modules:

- `weather`: handles weather reports
- `subscriptions`: handles managing subscriptions (creating, confirming, removing), and sheduling of sending weather updates (`subscriptions.cron.ts`)

Sending emails is done in `src/email` module using Mailersend.

App has a basic frontend (subscription form and confirm/unsub result pages) done with Handlebars templates and Htmx

## License

GPLv3
