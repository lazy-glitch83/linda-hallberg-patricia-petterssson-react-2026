//Fetch information and display all employees in the database in a nice way.

import { useState } from "react";
//import "./index.css";

function Employees() {
  const [listEmployees, setListEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); //vart vi sparar personen vi hämtar , borde dessa vara tvärtom?
  const [employeeId, setEmployeeId] = useState(""); //what employee id jag vill använda
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

  const getEmployee = () => {
    //Hämtar personen från servern, är ordningen rätt?
    fetch(`http://localhost:3000/api/v1.0/employees/${employeeId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("The data is there");
        console.log(`data: ${JSON.stringify(data)}`);
        setSelectedEmployee(data);
      })
      .catch((error) => console.error("Error fetching employee:", error));
  };
  // Update employeeId when the user types in the input field
  const changeEmployeeId = (theEvent) => {
    theEvent.preventDefault();
    setEmployeeId(theEvent.target.value); // takes the value from the input field and sets it to employeeId
  };

  //Assume that the data returned from the API is an array of employee objects with properties like eid, fname, and lname. You can modify the rendering logic based on the actual structure of your data.
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
      {/*text rutan med employeeId där man kan skriva */}
      <input
        type="text"
        name="employeeId"
        placeholder="Employee ID"
        value={employeeId}
        onChange={changeEmployeeId}
      />
      <button onClick={getEmployee}>Get Employee</button>
    </div>
  );
}
export default Employees;
