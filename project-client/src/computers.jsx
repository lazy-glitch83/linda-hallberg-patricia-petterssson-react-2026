import { useState } from "react";

function Computers() {
  // State for holding the full array of computers fetched from the backend API
  const [listComputers, setListComputers] = useState([]);

  // State for holding detailed information about a single selected computer
  const [selectedComputer, setSelectedComputer] = useState(null);

  // Fetch all computers from the server
  const updateComputers = () => {
    fetch(`http://localhost:3000/api/v1.0/computers`)
      .then((response) => response.json())
      .then((data) => {
        setListComputers(data); // Save fetched array into state
        console.log("The data is there");
        console.log(`data: ${JSON.stringify(data)}`);
      })
      .catch((error) => console.error("Error fetching computers:", error));
  };

  // Fetch detailed information for a specific computer by its unique ID (cid)
  const getComputer = (id) => {
    fetch(`http://localhost:3000/api/v1.0/computers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("The data is there");
        console.log(`Computer data: ${JSON.stringify(data)}`);
        setSelectedComputer(data); // Update state to display computer details
      })
      .catch((error) => console.error("Error fetching computer:", error));
  };

  // Handle new computer form submission using an uncontrolled component pattern
  const addComputer = (theEvent) => {
    theEvent.preventDefault(); // Prevent default browser form refresh

    // Capture form DOM element synchronously before any async fetch calls
    const form = theEvent.currentTarget;

    // Extract all input values using the native FormData API
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Convert string inputs to numeric types or set to null if empty
    data.year = data.year ? Number(data.year) : null;
    data.eid = data.eid ? Number(data.eid) : null;

    console.log("Sending computer data:", data);

    // Send HTTP POST request to persist the new computer in the database
    fetch(`http://localhost:3000/api/v1.0/computers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // Explicitly handle HTTP error status codes (e.g., 400 or 500)
        if (!response.ok) {
          throw new Error(`HTTP status error: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Computer added successfully:", responseData);
        updateComputers(); // Refresh computer list to reflect changes
        form.reset();      // Clear form inputs
      })
      .catch((error) => console.error("Error adding computer:", error));
  };

  return (
    <div>
      {/* Section 1: Computers List */}
      <div className="computers-list">
        <button onClick={updateComputers}>Update Computers</button>
        <ul>
          {listComputers.map((computer) => (
            <li
              key={computer.cid}
              onClick={() => getComputer(computer.cid)} // Load computer details on click
              style={{ cursor: "pointer" }}
            >
              Type: {computer.type}, Brand: {computer.brand}, Model:{" "}
              {computer.model}
            </li>
          ))}
        </ul>
      </div>

      {/* Section 2: Selected Computer Details (Conditionally rendered when selectedComputer exists) */}
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
            {/* Display Employee ID or 'N/A' fallback if null/undefined */}
            {selectedComputer.eid !== null && selectedComputer.eid !== undefined
              ? selectedComputer.eid
              : "N/A"}
          </p>
        </div>
      )}

      {/* Section 3: Add Computer Form */}
      <div className="form-container">
        <h3>Add Computer:</h3>
        <form onSubmit={addComputer}>
          <input type="text" name="type" placeholder="Type" required />
          <input type="text" name="brand" placeholder="Brand" required />
          <input type="text" name="model" placeholder="Model" required />
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