import { useState } from "react";

function Employees() {
  // State for the list of employees
  const [listEmployees, setListEmployees] = useState([]);

  // State for one selected employee
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch all employees from the server
  const updateEmployees = () => {
    fetch("http://localhost:3000/api/v1.0/employees")
      .then((response) => response.json())
      .then((data) => {
        setListEmployees(data);
        console.log("Employee data:", data);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  };

  // Fetch one employee by ID
  const getEmployee = (id) => {
    fetch(`http://localhost:3000/api/v1.0/employees/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedEmployee(data);
      })
      .catch((error) => console.error("Error fetching employee:", error));
  };

  // Add a new employee using the form
  const addEmployee = (theEvent) => {
    theEvent.preventDefault();

    const form = theEvent.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch("http://localhost:3000/api/v1.0/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP status error: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Employee added successfully:", responseData);
        updateEmployees();
        form.reset();
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
          prevList.filter((employee) => employee.eid !== Number(id)),
        );

        setSelectedEmployee(null);
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  return (
    <div>
      {/* Section 1: Employees List */}
      <div className="employees-list">
        <button onClick={updateEmployees}>Update Employees</button>

        <ul>
          {listEmployees.slice(0, 5).map((employee) => (
            <li
              key={employee.eid}
              onClick={() => getEmployee(employee.eid)}
              style={{ cursor: "pointer" }}
            >
              Firstname: {employee.fname}, Lastname: {employee.lname}
            </li>
          ))}
        </ul>
      </div>

      {/* Section 2: Select Employee */}
      <div>
        <label htmlFor="eid-select">Select an Employee ID:</label>

        <select
          id="eid-select"
          value={selectedEmployee ? selectedEmployee.eid : ""}
          onChange={(e) => {
            if (e.target.value) {
              getEmployee(e.target.value);
            }
          }}
        >
          <option value="" disabled>
            -- Select an Employee --
          </option>

          {listEmployees.map((employee) => (
            <option key={employee.eid} value={employee.eid}>
              {employee.eid} - {employee.fname} {employee.lname}
            </option>
          ))}
        </select>
      </div>

      {/* Section 3: Selected Employee Details */}
      {selectedEmployee && (
        <div className="employee-details">
          <h3>Employee ID: {selectedEmployee.eid}</h3>
          <p>Firstname: {selectedEmployee.fname}</p>
          <p>Lastname: {selectedEmployee.lname}</p>
          <p>Phone: {selectedEmployee.phone}</p>
          <p>Email: {selectedEmployee.email}</p>
          <p>Date of birth: {selectedEmployee.dateofbirth}</p>

          <button onClick={() => deleteEmployee(selectedEmployee.eid)}>
            Delete Employee
          </button>
        </div>
      )}

      {/* Section 4: Add Employee Form */}
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

export default Employees;
