const express = require("express"); // Loading Express package into 'express' variable
const Database = require("better-sqlite3"); // connection to sqlite3
const cors = require("cors"); //enable Cors for all routes

const MYPORT = 3000; // define the port
const db = new Database("./company.db", { verbose: console.log });
const app = express(); // create the express application

app.use(express.json());
//Defining default route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/v1.0/computers", (req, res) => {
  console.log("---> GET all computer");
  const stmt = db.prepare("SELECT * FROM Computer");
  const computers = stmt.all();
  res.json(computers);
});

app.get("/api/v1.0/computers/:id", (req, res) => {
  console.log(`---> GET computer with id ${req.params.id}`);
  const theComputer = db
    .prepare("SELECT * FROM Computer WHERE cid = ?")
    .get([req.params.id]);
  res.json(theComputer);
});

app.listen(MYPORT, () => {
  console.log(`Server is running on port ${MYPORT}`);
});
