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
app.use(cors()); // enable CORS for all routes

// ROOT ROUTES - Combined API for Computers and Employees
app.get("/", (req, res) => {
  // define the default route '/'
  res.send(`<div style="font-family: sans-serif;">
        <h1>Welcome on the server API 1.0</h1>
        <h2>REST API Computers:</h2>
        <ul>
            <li>GET all computers: <a href="http://localhost:${MYPORT}/api/v1.0/computers">http://localhost:${MYPORT}/api/v1.0/computers</a></li>

            <li>GET computer number 2347: <a href="http://localhost:${MYPORT}/api/v1.0/computers/2347">http://localhost:${MYPORT}/api/v1.0/computers/2347</a></li>

            <li>ADD a computer: <button onclick="fetch('http://localhost:${MYPORT}/api/v1.0/computers', { method: 'POST' })">Add Computer</button></li>

            <li>DELETE computer number 3330: <button onclick="fetch('http://localhost:${MYPORT}/api/v1.0/computers/3330', { method: 'DELETE' })">Delete Computer</button></li>
        </ul>

                <h2>REST API Employees:</h2>
        <ul>
            <li>GET all employees: <a href="http://localhost:${MYPORT}/api/v1.0/employees">http://localhost:${MYPORT}/api/v1.0/employees</a></li>

            <li>GET employee number 37: <a href="http://localhost:${MYPORT}/api/v1.0/employees/37">http://localhost:${MYPORT}/api/v1.0/employees/37</a></li>

            <li>ADD an employee: <button onclick="fetch('http://localhost:${MYPORT}/api/v1.0/employees', { method: 'POST' })">Add Employee</button></li>

            <li>DELETE employee number 3: <button onclick="fetch('http://localhost:${MYPORT}/api/v1.0/employees/3', { method: 'DELETE' })">Delete Employee</button></li>
        </ul>
    </div>`);
});

// ROUTES FOR COMPUTERS
//GET /api/v1.0/computers      -> get all computers
app.get("/api/v1.0/computers", function (req, res) {
  console.log("---> GET all computers");
  const stmt = db.prepare("SELECT * FROM Computer");
  const computers = stmt.all();
  res.json(computers);
});

//GET /api/v1.0/computers/:id      -> get one computer
app.get("/api/v1.0/computers/:id", (req, res) => {
  console.log(`---> GET computer with cid ${req.params.id}`);

  const computerId = req.params.id;

  const theComputer = db
    .prepare("SELECT * FROM Computer WHERE cid = ?")
    .get(computerId);

  if (!theComputer) {
    res.status(404).json({ error: "Computer not found" });
    return;
  }

  res.json(theComputer);
});

// POST /api/v1.0/computers      -> create a computer
app.post("/api/v1.0/computers", (req, res) => {
  const { type, brand, model, ram, disk, year, eid } = req.body;
  console.log("--> ADD a Computer");

  const theComputer = db
    .prepare(
      "INSERT INTO Computer (type, brand, model, ram, disk, year, eid) VALUES (?, ?, ?, ?, ?, ?, ?)",
    )
    .run([type, brand, model, ram, disk, year, eid]);
  res.json(theComputer);
});

// DELETE /api/v1.0/computers/:id   -> delete a computer
app.delete("/api/v1.0/computers/:id", (req, res) => {
  console.log(`--> DELETE Computer with cid: ${req.params.id}`);
  const theComputer = db
    .prepare("DELETE FROM Computer WHERE cid = ?")
    .run([req.params.id]);

  res.json(theComputer);
});

//Routes for Employees
//GET /api/v1.0/employees      -> get all employees
app.get("/api/v1.0/employees", function (req, res) {
  console.log("---> GET all employees");
  const stmt = db.prepare("SELECT * FROM Employee");
  const employees = stmt.all();
  res.json(employees);
});

//GET /api/v1.0/employees/:id      -> get one employee
app.get("/api/v1.0/employees/:id", (req, res) => {
  console.log(`---> GET employee with eid ${req.params.id}`);
  const employeeId = req.params.id;
  const theEmployee = db
    .prepare("SELECT * FROM Employee WHERE eid = ?")
    .get(employeeId);
  if (!theEmployee) {
    res.status(404).json({ error: "Employee not found" });
    return;
  }
  res.json(theEmployee);
});

// POST /api/v1.0/employees      -> create an employee
app.post("/api/v1.0/employees", (req, res) => {
  const { fname, lname, phone, email, dateofbirth } = req.body;
  // console.log("--> ADD an Employee");
  //const fname = "John";
  //const lname = "Doe";
  //const phone = "123-456-7890";
  //const email = "john.doe@example.com";
  //const dateofbirth = "1990-01-01";

  const theEmployee = db
    .prepare(
      "INSERT INTO Employee (fname, lname, phone, email, dateofbirth) VALUES (?, ?, ?, ?, ?)",
    )
    .run([fname, lname, phone, email, dateofbirth]);
  res.json(theEmployee);
});

// PUT /api/v1.0/employees/:id      -> update an employee
app.put("/api/v1.0/employees/:id", (req, res) => {
  console.log(`--> UPDATE Employee with eid: ${req.params.id}`);
  const theEmployee = db
    .prepare(
      "UPDATE Employee SET fname = ?, lname = ?, phone = ?, email = ?, dateofbirth = ? WHERE eid = ?",
    )
    .run([
      req.body.fname,
      req.body.lname,
      req.body.phone,
      req.body.email,
      req.body.dateofbirth,
      req.params.id,
    ]);

  res.json(theEmployee);
}); //

// DELETE /api/v1.0/employees/:id   -> delete an employee
app.delete("/api/v1.0/employees/:id", (req, res) => {
  console.log(`--> DELETE Employee with eid: ${req.params.id}`);
  const theEmployee = db
    .prepare("DELETE FROM Employee WHERE eid = ?")
    .run([req.params.id]);

  res.json(theEmployee);
});

app.listen(MYPORT, () => {
  // listen on the port
  console.log(`Server up and running on http://localhost:${MYPORT}...`);
});
