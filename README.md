# RTB House Home Task

> **Note**\
> This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## How to start?

### Docker

- Clone this repo
- Run `docker-compose up`

You'll need to manually run migrations, unfireunately, I didn't manage to make them run automatically. For this you need:

- Clone `.env.example` under the name `.env`, the default `DATABASE_URL` should point to the locally running container.
- Run `npm run db:push`
- Open `http://localhost:3000/` in the borwser

### Local

- Clone this repo
- Run npm isntall
- Make a copy of `.env.example` and rename it to `.env`
- Change the `DATABASE_URL` variable inside the `.env` file
- Run `npm run db:push`
- Run `npm run dev`
- Open `http://localhost:3000/` in the borwser
