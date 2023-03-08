const { Pool } = require("pg");
const pool = require("./db_conn");
const DATABASE_URL = process.env.DATABASE_URL;

pool.query(
  "CREATE TABLE IF NOT EXISTS users (id SERIAL,username varchar(25),password varchar(25),max_score int,total_kills int,total_deaths int)",
  (err, data) => {
    if (err) {
      console.log("CREATE TABLE failed");
    } else {
      console.log("CREATE TABLE sucessful");
    }
  }
);

pool.end();
