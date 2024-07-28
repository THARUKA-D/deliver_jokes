# deliver_jokes

Deliver a random joke on request by a user from a web page.

## How to run,

1. Create following Database and tables on mysql locally.

CREATE DATABASE jokes;

then,

CREATE TABLE JokeTypes (
Id int NOT NULL AUTO_INCREMENT,
JokeType varchar(255) UNIQUE NOT NULL,
PRIMARY KEY (Id)
);

then,

CREATE TABLE Jokes (
Id int NOT NULL AUTO_INCREMENT,
Joke text NOT NULL,
Delivery text,
JokeTypeId int DEFAULT NULL,
PRIMARY KEY (Id),
FOREIGN KEY (JokeTypeId) REFERENCES JokeTypes(Id)
);

2. Create a .env file with following variables.

PORT=
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=

3. Update the shared values.
4. run npm i
5. run npm run dev
