# Thanks_bot 2

This is a simple discord bot to keep track of helpfull people so mods can reward them. It

# Dependencies

-   Node (v14.10.0)
-   Yarn (npm install yarn -g)
-   Postgresql

# Setup docker

1. Install docker and docker compose
2. Copy `database.example.json` to `database.json`
3. Copy `postgresql.example.json` to `postgresql.json`
4. Copy `config.example.json` to `config.json`
5. Put your own key into the `config.json` file (You can get a key for your bot at https://discord.com/developers/applications )
6. Run `docker-compose up` and watch the magic happen as `docker-compose` pulls in everything needed and starts the bot.

# Setup locally

1. Copy `database.example.json` to `database.json`
2. Fill in the details to connect to your locally running database
3. Copy `postgresql.example.json` to `postgresql.json`
4. Fill here the database connection in again (I know, feels redundant)
5. Copy `config.example.json` to `config.json`
6. Put your own key into the `config.json` file (You can get a key for your bot at https://discord.com/developers/applications )
7. Run `yarn install`
8. Run `yarn migrate up` to run the migrations
9. Run `yarn start` to start the bot. Or use `yarn start:dev` to also have it automatically restart when it detects changes.

# Usefull scripts

1. `lintFix` uses eslint to fix most lint errors (PR's with lint errors won't get merged)
2. `unitTest` runs the unit tests
3. `prepareSql` reads the sql files and updates the generated types (use -w to run in watch mode)
4. `start:dev` automatically recompiles and restarts on changes
5. `build` does a clean build
6. `start` does a clean build, then starts the bot
7. `migrate` to run [db-migrate](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/usage/)
8. `lint` runs eslint and tells you what the problems are.
9. `test` runs the linter and the unit tests
