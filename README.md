# Todo app

## | Prerequisites

- Node v16.13.0 and up - https://nodejs.org/en/download/
- Yarn v1.22.17 and up - https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable
- TypeScript (tsc) v4.6.2 and up - `yarn global add typescript`
- PostgreSQL 14.2 and up - https://www.postgresql.org/download/

## | Installing

1. Clone this reporsitory - https://github.com/djtaraz/todo-app.git

### || Database

2. Open your PostgreSQL app and press <b>Start</b>
3. Open a terminal and type

```
psql -U postgres
```

3. You are connected as user postgres
4. In the repository you cloned, in the <b>server</b> directory, there is a file called database.sql
5. Copy the first line or from the file or from here

```
CREATE DATABASE todoapp;
```

6. Paste into the terminal where you are connected as postgres
7. Terminal should return saying CREATE DATABASE
8. Run the command below in that terminal and you will connect to that database

```
\c todoapp
```

9. Copy and paste the second function from database.sql file or from here into the same terminal

```
CREATE TABLE todo(
    id serial PRIMARY KEY,
    name VARCHAR ( 50 ),
    created_at TIMESTAMP,
    completed_at TIMESTAMP,
    status BOOLEAN
);
```

10. Terminal should return saying CREATE DATABASE

### || Server

11. In <em>another</em> terminal, cd into the repository you cloned and then

```
cd server
```

12. Install packages

```
yarn install
```

14. Run the build command

```
yarn build
```

15. Then start the server

```
yarn start
```

### || Client

15. In <em><b>yet</b> another</em> terminal, cd into the repository you cloned and then

```
cd client
```

16. Install packages

```
yarn install
```

17. Run the build command

```
yarn build
```

18. Then start the server

```
yarn start
```

19. open http://localhost:3000 in your browser

## The application should now be up and running!
