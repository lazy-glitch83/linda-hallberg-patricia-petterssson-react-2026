//Fetch information and display all computers in the database in a nice way.

import { useState } from "react";
//import "./index.css";

function Computers() {
    const [listComputers, setListComputers] = useState([]);
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

  //Assume that the data returned from the API is an array of computer objects with properties like cid, name, and description. You can modify the rendering logic based on the actual structure of your data.
  return (
    <div>
      <button onClick={updateComputers}>Update Computers</button>
      <ul>
        {listComputers.map((computers) => (
          <li key={computers.cid}>
            Type: {computers.type}, Brand: {computers.brand}, Model:{" "}
            {computers.model}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Computers;
