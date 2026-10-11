//Fetch information and display all computers in the database in a nice way.

import { useState } from "react";
//import "./index.css";

function Computers() {
  const [listComputers, setListComputers] = useState([]); // usestate används för att spara värden som kan ändras medan sidan används
  const [selectedComputer, setSelectedComputer] = useState(null);

  const updateComputers = () => {
    fetch(`http://localhost:3000/api/v1.0/computers`)
      .then((response) => response.json())
      .then((data) => {
        setListComputers(data);
        console.log("The data is there");
        console.log(`data: ${JSON.stringify(data)}`);
      })
      .catch((error) => console.error("Error fetching computers:", error));
  };

  const getComputer = (id) => {
    //Get a specific computer by its ID
    fetch(`http://localhost:3000/api/v1.0/computers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("The data is there");
        console.log(`Computer data: ${JSON.stringify(data)}`);
        setSelectedComputer(data);
      })
      .catch((error) => console.error("Error fetching computer:", error));
  };

  const addComputer = (theEvent) => {
    theEvent.preventDefault();

    const formData = new FormData(theEvent.target);
    const data = Object.fromEntries(formData.entries());

    data.year = Number(data.year); // Convert year to number.
    data.eid = data.eid ? Number(data.eid) : null; // Convert eid to number or set to null if nothing applied.

    fetch(`http://localhost:3000/api/v1.0/computers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Computer added successfully:", data);
        updateComputers(); // Update the list of computers
        theEvent.target.reset(); // Reset the form after submission
      })
      .catch((error) => console.error("Error adding computer:", error));
  };

  return (
    <div>
      {/* 1. Computers List */}
      <div className="computers-list">
        <button onClick={updateComputers}>Update Computers</button>
        <ul>
          {listComputers.map((computers) => (
            <li
              key={computers.cid}
              onClick={() => getComputer(computers.cid)}
              style={{ cursor: "pointer" }}
            >
              Type: {computers.type}, Brand: {computers.brand}, Model:{" "}
              {computers.model}
            </li>
          ))}
        </ul>
      </div>

      {selectedComputer && (
        <div className="computer-details">
          <h3>Computer ID: {selectedComputer.cid}:</h3>
          <p>Type: {selectedComputer.type}</p>
          <p>Brand: {selectedComputer.brand}</p>
          <p>Model: {selectedComputer.model}</p>
          <p>RAM: {selectedComputer.ram}</p>
          <p>Disk: {selectedComputer.disk}</p>
          <p>Year: {selectedComputer.year}</p>
          <p>
            Employee ID:{" "}
            {selectedComputer.eid !== null && selectedComputer.eid !== undefined
              ? selectedComputer.eid
              : "N/A"}
          </p>
        </div>
      )}

      <div className="form-container">
        <h3>Add Computer:</h3>
        <form onSubmit={addComputer}>
          <input type="text" name="type" placeholder="Type" />
          <input type="text" name="brand" placeholder="Brand" />
          <input type="text" name="model" placeholder="Model" />
          <input type="text" name="ram" placeholder="RAM" />
          <input type="text" name="disk" placeholder="Disk" />
          <input type="number" name="year" placeholder="Year" />
          <input type="number" name="eid" placeholder="Employee ID" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Computers;
