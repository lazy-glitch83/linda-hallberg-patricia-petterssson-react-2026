// LOAD PACKAGES
const express = require("express"); // read the express library
const Database = require("better-sqlite3"); // connection to sqlite3
const cors = require("cors"); // enable CORS for all routes

// DEFINE CONSTANTS
const MYPORT = 3000; // define the port
const db = new Database("./company.db", { verbose: console.log });
const app = express(); // create the express application

// DEFINE MIDDLEWARES
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  // define the default route '/'
  res.send(`<div style="font-family: sans-serif;">
        <h1>Welcome on the server API 1.0</h1>
        <h2>REST API:</h2>
        <ul>
            <li>GET all computers: <a href="http://localhost:${MYPORT}/api/v1.0/computers">http://localhost:${MYPORT}/api/v1.0/computers</a></li>

            <li>GET computer number 2347: <a href="http://localhost:${MYPORT}/api/v1.0/computers/2347">http://localhost:${MYPORT}/api/v1.0/computers/2347</a></li>

            <li>ADD a computer: <button onclick="fetch('http://localhost:${MYPORT}/api/v1.0/computers', { method: 'POST' })">Add Computer</button></li>

            <li>DELETE computer number 1170: <button onclick="fetch('http://localhost:${MYPORT}/api/v1.0/computers/1170', { method: 'DELETE' })">Delete Computer</button></li>
        </ul>
    </div>`);
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
