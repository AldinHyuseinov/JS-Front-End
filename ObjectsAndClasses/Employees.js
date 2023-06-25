function printEmployees(employees) {
  const employeesAndPersonalNumbers = [];

  employees.forEach((employee) => {
    employeesAndPersonalNumbers.push({ name: employee, personalNumber: employee.length });
  });

  employeesAndPersonalNumbers.forEach((employee) => {
    console.log(`Name: ${employee.name} -- Personal Number: ${employee.personalNumber}`);
  });
}

printEmployees(["Silas Butler", "Adnaan Buckley", "Juan Peterson", "Brendan Villarreal"]);
