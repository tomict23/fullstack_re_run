CREATE TABLE IF NOT EXISTS users (
    id serial,
    name varchar(25),
    password varchar(25),
    max_score int,
    total_kills int,
    total_deaths int
);