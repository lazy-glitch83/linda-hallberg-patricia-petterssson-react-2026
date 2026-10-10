//Fetch information and display all computers in the database in a nice way.

import { useState } from "react";
//import "./index.css";

function Computers() {
  const [listComputers, setListComputers] = useState([]);
  const [selectedComputer, setSelectedComputer] = useState(null);
  const [computerId, setComputerId] = useState("");

  const updateComputers = () => {
    fetch(`http://localhost:3000/api/v1.0/computers`)
      .then((response) => response.json())
      .then((data) => {
        console.log("The data is there");
        console.log(`data: ${JSON.stringify(data)}`);
        setListComputers(data);
      })
      .catch((error) => console.error("Error fetching computers:", error));
  };

  const getComputer = () => { //Get a specific computer by its ID
    fetch(`http://localhost:3000/api/v1.0/computers/${computerId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("The data is there");
        console.log(`Computer data: ${JSON.stringify(data)}`);
        setSelectedComputer(data);
      })
      .catch((error) => console.error("Error fetching computer:", error));
  };

  return (
  //Update list so it is clickable and you can get a specific computer by its ID
    <div>
      <button onClick={updateComputers}>Update Computers</button>
      <ul>
        {listComputers.map((computers) => (
          <li key={computers.cid}
            onClick={() => getComputer(computers.cid)}
            style={{ cursor: "pointer" }} 
            >
            Type: {computers.type}, Brand: {computers.brand}, Model:{" "}
            {computers.model}
          </li>
        ))}
      </ul>

      {selectedComputer && (
        <div>
          <h3>Computer ID: {selectedComputer.cid}:</h3>
          <p>Type: {selectedComputer.type}</p>
          <p>Brand: {selectedComputer.brand}</p>
          <p>Model: {selectedComputer.model}</p>
          <p>RAM: {selectedComputer.ram}</p>
          <p>Disk: {selectedComputer.disk}</p>
          <p>Year: {selectedComputer.year}</p>  
          <p>Employee ID: {selectedComputer.eid}</p>
        </div>
      )}
      </div>
  );
}
export default Computers
