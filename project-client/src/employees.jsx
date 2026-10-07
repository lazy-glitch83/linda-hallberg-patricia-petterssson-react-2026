//Fetch information and display all computers in the database in a nice way.

import { useState } from "react";
//import "./index.css";

function Employees() {
  const [listEmployees, setListEmployees] = useState([]);
  const updateEmployees = () => {
    fetch(`http://localhost:3000/api/v1.0/employees`)
      .then((response) => response.json())
      .then((data) => {
        console.log("The data is there");
        console.log(`data: ${JSON.stringify(data)}`);
        setListEmployees(data);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  };

  //Assume that the data returned from the API is an array of computer objects with properties like cid, name, and description. You can modify the rendering logic based on the actual structure of your data.
  return (
    <div>
      <button onClick={updateEmployees}>Update Employees</button>
      <ul>
        {listEmployees.map((employee) => (
          <li key={employee.eid}>
            Firstname: {employee.fname}, Lastname: {employee.lname},
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Employees;
