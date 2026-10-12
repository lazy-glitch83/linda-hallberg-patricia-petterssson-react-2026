//Fetch information and display all employees in the database in a nice way.

import { useState } from "react";

function Employees() {
  const [listEmployees, setListEmployees] = useState([]);
  //saves a list of all the employees on the server, and uses setlistEmployees to update the list
  const [selectedEmployee, setSelectedEmployee] = useState(null); //vart vi sparar personen vi hämtar , borde dessa vara tvärtom?
  const [employeeId, setEmployeeId] = useState(""); //what employee id jag vill använda
  const updateEmployees = () => {
    //gets all employees from the server
    fetch(`http://localhost:3000/api/v1.0/employees`)
      .then((response) => response.json())
      .then((data) => {
        console.log("The data is there");
        console.log(`data: ${JSON.stringify(data)}`);
        setListEmployees(data); // saves the data in out employee list
      })
      .catch((error) => console.error("Error fetching employees:", error)); // error if something goes wrong?
  };

  const getEmployee = () => {
    //Gets one employee using their ID
    fetch(`http://localhost:3000/api/v1.0/employees/${employeeId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("The data is there");
        console.log(`data: ${JSON.stringify(data)}`);
        //saves the employee we got from server
        setSelectedEmployee(data);
      })
      .catch((error) => console.error("Error fetching employee:", error));
  };
  // Updates the employeeId when the user types in the input field
  const changeEmployeeId = (theEvent) => {
    theEvent.preventDefault();
    setEmployeeId(theEvent.target.value); // takes the value from the input field and sets it to employeeId
  };
  //when user selects an employee from the dropdown
  const handleSelectEid = (e) => {
    const selectedEid = e.target.value;
    setEmployeeId(selectedEid);
  };
  // adds a new employee using the form
  const addEmployee = (theEvent) => {
    theEvent.preventDefault();
    //Gets the info entered in the form
    const formData = new FormData(theEvent.target);
    const data = Object.fromEntries(formData.entries());
    // sends  the employee info to the server
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

  // Delete an employee by ID
  const deleteEmployee = (id) => {
    fetch(`http://localhost:3000/api/v1.0/employees/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Employee deleted successfully:", data);

        setListEmployees((prevList) =>
          prevList.filter((employee) => employee.eid !== id),
        );

        setSelectedEmployee(null);
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  //Assume that the data returned from the API is an array of employee objects with properties like eid, fname, and lname. You can modify the rendering logic based on the actual structure of your data.
  //  what the user sees on the page
  return (
    <div>
      <button onClick={updateEmployees}>Update Employees</button>
      <ul className="employees-list">
        {/* Shows the first and last names of all employees */}
        {listEmployees.map((employee) => (
          <li key={employee.eid}>
            Firstname: {employee.fname}, Lastname: {employee.lname},
          </li>
        ))}
      </ul>
      {/*text field for employee ID */}
      <input
        type="text"
        name="employeeId"
        placeholder="Employee ID"
        value={employeeId}
        onChange={changeEmployeeId}
      />
      {/* Dropdown to select an employee by ID */}
      <select value={employeeId} onChange={handleSelectEid}>
        <option value="">Select Employee ID</option>
        {listEmployees.map((employee) => (
          <option key={employee.eid} value={employee.eid}>
            {employee.eid} - {employee.fname} {employee.lname}
          </option>
        ))}
      </select>

      <button onClick={getEmployee}>Get Employee</button>
      {/*I followed the same structure as the computer details component, but
      used the employee fields instead. Not sure if its correct, gets information on in specific employee*/}

      {/* information about the selected employee */}
      {selectedEmployee && (
        <div className="employee-details">
          <h3>Employee ID: {selectedEmployee.eid}</h3>
          <p>Firstname: {selectedEmployee.fname}</p>
          <p>Lastname: {selectedEmployee.lname}</p>
          <p>Phone: {selectedEmployee.phone}</p>
          <p>Email: {selectedEmployee.email}</p>
          <p>Date of birth: {selectedEmployee.dateofbirth}</p>
        </div>
      )}

      {/* button to delete the selected employee */}
      <button onClick={() => deleteEmployee(Number(employeeId))}>
        Delete Employee
      </button>

      {/* form to add a new employee */}
      <div className="form-container">
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
    </div>
  );
}

// Makes the Employees component available in other files
export default Employees;
