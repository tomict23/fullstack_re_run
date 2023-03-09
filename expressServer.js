/*
 ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ 
 ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
 ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
 ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
 ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
 ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
*/

const express = require("express");
const server = express();
const cors = require("cors");
server.use(express.json());
server.use(cors());
const path = require("path");
const pool = require("./db_conn");

server.use(express.static("./game-abyss"));

const port = process.env.PORT || 8000; // port that Express will listen to for requests

// const bodyParser = require("body-parser");
// server.use(bodyParser.json());

/*
 ██████╗  ██████╗ ██╗   ██╗████████╗██╗███╗   ██╗ ██████╗    
 ██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██║████╗  ██║██╔════╝ ██╗
 ██████╔╝██║   ██║██║   ██║   ██║   ██║██╔██╗ ██║██║  ███╗╚═╝
 ██╔══██╗██║   ██║██║   ██║   ██║   ██║██║╚██╗██║██║   ██║██╗
 ██║  ██║╚██████╔╝╚██████╔╝   ██║   ██║██║ ╚████║╚██████╔╝╚═╝
 ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝    
  ██████╗ ███████╗████████╗
 ██╔════╝ ██╔════╝╚══██╔══╝
 ██║  ███╗█████╗     ██║   
 ██║   ██║██╔══╝     ██║   
 ╚██████╔╝███████╗   ██║   
  ╚═════╝ ╚══════╝   ╚═╝   
*/
// GET req for login page
server.get("/", (req, res, next) => {
  //   pool.query(
  //     "SELECT * FROM videogames LEFT JOIN companies ON videogames.company_id = companies.id",
  //     (err, data) => {
  //       if (err) {
  //         return next(err);
  //       }
  //       console.log(data.rows);
  //       return res.send(data.rows);
  //     }
  //   );
  res.send("login page goes here");
});

server.get("/abyssgame", (req, res, next) => {
  //   pool.query("SELECT * FROM videogames", (err, result) => {
  //     if (err) {
  //       return next(err);
  //     }

  //     const rows = result.rows;
  //     console.log(rows);
  //     return res.send(rows);
  //   });
  res.sendFile(path.join(__dirname, "./game-abyss/abyssgame.html"));
});

/*
 ██████╗  ██████╗ ██╗   ██╗████████╗██╗███╗   ██╗ ██████╗     ███████╗███╗   ██╗██████╗ 
 ██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██║████╗  ██║██╔════╝     ██╔════╝████╗  ██║██╔══██╗
 ██████╔╝██║   ██║██║   ██║   ██║   ██║██╔██╗ ██║██║  ███╗    █████╗  ██╔██╗ ██║██║  ██║
 ██╔══██╗██║   ██║██║   ██║   ██║   ██║██║╚██╗██║██║   ██║    ██╔══╝  ██║╚██╗██║██║  ██║
 ██║  ██║╚██████╔╝╚██████╔╝   ██║   ██║██║ ╚████║╚██████╔╝    ███████╗██║ ╚████║██████╔╝
 ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ 
*/

server.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.sendStatus(500);
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Listening on port", port);
});

module.exports = server;

/*
 ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗     ███████╗███╗   ██╗██████╗ 
 ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗    ██╔════╝████╗  ██║██╔══██╗
 ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝    █████╗  ██╔██╗ ██║██║  ██║
 ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗    ██╔══╝  ██║╚██╗██║██║  ██║
 ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║    ███████╗██║ ╚████║██████╔╝
 ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═══╝╚═════╝ 
*/
