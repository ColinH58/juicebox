require('dotenv').config();
const express = require("express");
const server = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const apiRouter = require("./api");

const { client } = require("./db");
client.connect();

server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(express.json());
server.use("/api", apiRouter);

server.get("/background/:color", (req, res, next) => {
  res.send(`
  <body style="background: ${req.params.color};">
  <h1>Hello World</h1>
  </body>
  `);
});

//Tells the server to always call this function
server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");
  
  next();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
