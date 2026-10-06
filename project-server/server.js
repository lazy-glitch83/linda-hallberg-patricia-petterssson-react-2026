const express = require("express"); // Loading Express package into 'express' variable
const app = express(); // Creating Express application into 'app' variable
const cors = require("cors"); //enable Cors for all routes

const MYPORT = 3000; // define the port
const db = new Database(" ./company.db", { verbose: console.log });
const app = express(); // create the express application

//Defining default route
app.get("/", (req, res) => {
  //continuing from p. 3 WORKSHOP 2: Node, express and REST API
  res.send("Server is running");
});

app.listen(MYPORT, () => {
  console.log(`Server is running on port ${MYPORT}`);
});

app.get("/", (req, res) => {
  console.log("---> GET all computers");
  const stmt = db.prepare("SELECT * FROM computer");
  const computers = stmt.all();
  res.json(computers);
});

app.get("/api/v1.0/computers/:id", (req, res) => {
  console.log(`---> GET computer with id ${req.params.id}`);
  const theComputer = db
    .prepare("SELECT * FROM computer WHERE cid = ?")
    .get([req.params.id]);
  res.json(theComputer);
});
