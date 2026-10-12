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
  const addEmployee = (theEvent) => {
    theEvent.preventDefault();

    const formData = new FormData(theEvent.target);
    const data = Object.fromEntries(formData.entries());

    fetch(`http://localhost:3000/api/v1.0/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Employee added successfully:", data);
        updateEmployees(); // Update the list of employees
        theEvent.target.reset(); // Reset the form after submission
      })
      .catch((error) => console.error("Error adding employee:", error));
  };

  const deleteEmployee = () => {
    fetch(`http://localhost:3000/api/v1.0/employees/${employeeId}`, {
      method: "DELETE",
    });
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
      {/*I followed the same structure as the computer details component, but
      used the employee fields instead. Not sure if its correct*/}
      {selectedEmployee && (
        <div>
          <h3>Employee ID: {selectedEmployee.eid}</h3>
          <p>Firstname: {selectedEmployee.fname}</p>
          <p>Lastname: {selectedEmployee.lname}</p>
          <p>Phone: {selectedEmployee.phone}</p>
          <p>Email: {selectedEmployee.email}</p>
          <p>Date of birth: {selectedEmployee.dateofbirth}</p>
        </div>
      )}
      <button onClick={deleteEmployee}>Delete Employee</button>
      <h3>Add Employee:</h3>
      <form onSubmit={addEmployee}>
        <input type="text" name="fname" placeholder="First name" />
        <input type="text" name="lname" placeholder="Last name" />
        <input type="text" name="phone" placeholder="Phone" />
        <input type="email" name="email" placeholder="Email" />
        <input type="date" name="dateofbirth" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default Employees;
