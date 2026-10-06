// LOAD PACKAGES
const express = require("express"); //read the express library
const Database = require("better-sqlite3"); // connection to sqlite3
const cors = require("cors"); // enable cors for all routes

//DEFINE CONSTANTS
const MYPORT = 3000; // define the port
const db = new Database("./company.db", { verbose: console.log });
const app = express(); // create the express application

//DEFINE MIDDLEWARE
app.use(express.json());
//Defining default route
app.get("/", (req, res) => {
  res.send("Server is running");
});

//GET /api/v1.0/computers     -> get all computers
app.get("/api/v1.0/computers", function (req, res) {
  console.log("---> GET all computers");
  const stmt = db.prepare("SELECT * FROM computers");
  const computers = stmt.all();
  res.json(computers);
});

app.get("/api/v1.0/computers/:id", (req, res) => {
  console.log(`---> GET computer with id ${req.params.id}`);
  const theComputer = db
    .prepare("SELECT * FROM computers WHERE cid = ?")
    .get([req.params.id]);
  res.json(theComputer);
});

// POST /api/v1.0/computers      -> create a computer
app.post("/api/v1.0/computers", (req, res) => {
  // const { brand, model, ram, disk, year, eid } = req.body
  console.log("--> ADD a Computer");
  const type = "laptop";
  const brand = "HP";
  const model = "EliteBook";
  const ram = "16GB";
  const disk = "512GB";
  const year = "2021";

  const theComputer = db
    .prepare(
      "INSERT INTO Computer (type, brand, model, ram, disk, year) VALUES (?, ?, ?, ?, ?, ?)",
    )
    .run([type, brand, model, ram, disk, year]);

  res.json(theComputer);
});

// PUT /api/v1.0/computers/:id      -> update a computer

// DELETE /api/v1.0/computers/:id   -> delete a computer
app.delete("/api/v1.0/computers/:id", (req, res) => {
  console.log(`--> DELETE Computer with cid: ${req.params.id}`);
  const theComputer = db
    .prepare("DELETE FROM Computer WHERE cid = ?")
    .run([req.params.id]);

  res.json(theComputer);
});

app.listen(MYPORT, () => {
  // listen on the port
  console.log(`Server up and running on http://localhost:${MYPORT}...`);
});
