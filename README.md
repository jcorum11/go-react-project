# GoReact Applicant Project

This is the take-home project for Software Engineers applying to work at GoReact. This same project is used for all Software Engineer positions. Make sure you follow the directions for the specific position you're applying for.

## Running the project

This project requires you to have Docker installed and Node.js v16. (or even better if you have `nvm` installed you can use the `.nvmrc` file in this project to set your Node version) To run this project, run the following commands in two separate terminal windows:

```shell
# Terminal 1 - API
$ docker compose up

# Terminal 2 - Client
$ cd client
$ npm install
$ npm start
```

The docker command will spin up Laravel and MySQL in docker containers. The API will be available at `localhost:9090`. The Client command will use the Angular CLI to serve the Angular application, which you can access at `localhost:4200`.

If you want to interact with any of your php or laravel commands, first get a shell into your docker container.

```shell
$ docker compose exec web /bin/bash
$ cd /www/web
```

From here, you can run any php or laravel commands you need.

## Running Tests

Part of your project is fixing broken tests and adding new tests. You can run your backend tests like so:

```shell
# API tests
$ docker compose exec web /bin/bash
$ cd /www/web
$ php artisan test
```

You can run your Client tests in watch mode with the following commands:

```shell
# Client Tests
$ cd client
$ npm test
```

## Project Requirements

Check the [REQUIREMENTS](./REQUIREMENTS.md) document to get the list of you need to do for your position application.
