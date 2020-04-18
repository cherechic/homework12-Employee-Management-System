const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_managerDB"
});

connection.connect(function (err) {
  if (err) throw err;
  init();
});

function init() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Departments",
        "View Roles",
        "View All Employees",
        "View Employees by Department",
        "View Employees by Manager",
        "View The Total Utilized Budget of a Department",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Remove Department",
        "Remove Role",
        "Remove Employee",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Departments":
          viewDepartments();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "View Employees by Department":
          viewEmployeesByDepartment();
          break;

        case "View Employees by Manager":
          viewEmployeesByManager();
          break;

        case "View The Total Utilized Budget of a Department":
          viewBudget();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Update Employee Manager":
          updateEmployeeManager();
          break;

        case "Remove Department":
          removeDepartment();
          break;

        case "Remove Role":
          removeRole();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });

}

function viewDepartments() {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    console.log("");
    init();
  });
}

function viewRoles() {
  var query = "SELECT role_id, role_title FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res, ["role_id", "role_title"]);
    console.log("");
    init();
  });
}

function viewEmployees() {
  var query = "SELECT employee.first_name, employee.last_name, role.role_title, " +
    "department.department_name FROM employee " +
    "LEFT JOIN role on employee.role_id = role.role_id " +
    "LEFT JOIN department on role.department_id = department.department_id";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    console.log("");
    init();
  });
}

function viewEmployeesByDepartment() {
  let array = [];
  var query = "SELECT department_id as value, department_name as name FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    array = JSON.parse(JSON.stringify(res));

    inquirer
      .prompt({
        name: 'department',
        type: 'list',
        message: 'Which department\'s employees do you want to see?',
        choices: array
      })
      .then(function (answer) {
        connection.query("SELECT employee.first_name, employee.last_name, role.role_title," +
          "department.department_name FROM employee LEFT JOIN role on employee.role_id = " +
          "role.role_id LEFT JOIN department on role.department_id = department.department_id " +
          "WHERE department.department_id = ?", [answer.department], function (err, res) {
            if (err) throw err;
            console.table(res);
            console.log("");
            init();
          });
      });
  });
}

function viewEmployeesByManager() {
  let array = [];
  var query = "SELECT employee.employee_id as value, CONCAT(employee.first_name, ' ', employee.last_name) as name " +
    "FROM employee INNER JOIN role ON employee.role_id = role.role_id WHERE role.manager = 1";
  connection.query(query, function (err, res) {
    if (err) throw err;
    array = JSON.parse(JSON.stringify(res));

    inquirer
      .prompt({
        name: 'manager',
        type: 'list',
        message: 'Which Manager\'s employees do you want to see?',
        choices: array
      })
      .then(function (answer) {
        connection.query("SELECT employee.employee_id, employee.first_name, employee.last_name " +
          "FROM employee WHERE manager_id = ?", [answer.manager], function (err, res) {
            if (err) throw err;
            console.table(res);
            console.log("");
            init();
          });
      });
  });
}

function viewBudget() {
  let array = [];
  var query = "SELECT department_id as value, department_name as name FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    array = JSON.parse(JSON.stringify(res));

    inquirer
      .prompt({
        name: 'department',
        type: 'list',
        message: 'Which department\'s budget do you want to see?',
        choices: array
      })
      .then(function (answer) {
        connection.query("SELECT role.department_id, department.department_name, " +
          "SUM(role.role_salary) FROM role INNER JOIN department on " +
          "role.department_id = department.department_id WHERE role.department_id = ?", [answer.department], function (err, res) {
            if (err) throw err;
            console.table(res);
            console.log("");
            init();
          });
      });
  });
}

function addDepartment() {
  inquirer.prompt(
    {
      type: "input",
      name: "name",
      message: "What is the name of the new department?"
    }
  ).then(function (answer) {
    connection.query("INSERT INTO department (department_name) VALUES (?)", [answer.name], function (err, res) {
      if (err) throw err;
      if (res.affectedRows > 0) {
        console.log(res.affectedRows + " record added successfully!");
      }
      console.log("");
      init();
    });
  });
}


function addRole() {
  let array = [];
  var query = "SELECT department_id as value, department_name as name FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    array = JSON.parse(JSON.stringify(res));
    var questions = [
      {
        type: "input",
        name: "name",
        message: "What is the name of the new role?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of this new role?",
        validate: validateSalary
      },
      {
        type: 'list',
        name: 'department',
        message: 'which department is the new role belongs?',
        choices: array
      },
      {
        type: 'confirm',
        name: 'manager',
        message: 'Is this a manager role?',
        default: false
      }];

    inquirer.prompt(questions).then(answer => {
      connection.query("INSERT INTO role (role_title, role_salary, department_id, manager) VALUES (?, ?, ?, ?)",
        [answer.name, answer.salary, answer.department, answer.manager], function (err, res) {
          if (err) throw err;
          if (res.affectedRows > 0) {
            console.log(res.affectedRows + " record added successfully!");
          }
          console.log("");
          init();
        });
    });
  });
}

function validateSalary(salary) {
  var reg = /^\d+$/;
  return reg.test(salary) || "Salary should be a number!";
}

function addEmployee() {
  //let array = [];
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is your first name?"
    },
    {
      type: "input",
      name: "last_name",
      message: "What is your last name?"
    }
  ]).then(function (answer) {
    var query = "SELECT role_id as value, role_title as name FROM role WHERE manager = 0";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let array = JSON.parse(JSON.stringify(res));
      inquirer
        .prompt(
          {
            name: 'role',
            type: 'list',
            message: 'Choose a role for the new employee',
            choices: array
          }).then(function (answer1) {
            var query = "SELECT employee.employee_id as value, CONCAT(employee.first_name, ' ', employee.last_name) as name " +
              "FROM employee INNER JOIN role ON employee.role_id = role.role_id WHERE role.manager = 1";
            connection.query(query, function (err, res) {
              if (err) throw err;
              let array2 = JSON.parse(JSON.stringify(res));
              inquirer
                .prompt({
                  name: 'manager',
                  type: 'list',
                  message: 'Choose a manager for the new employee',
                  choices: array2
                }).then(function (answer2) {
                  connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?)",
                    [answer.first_name, answer.last_name, answer1.role, answer2.manager], function (err, res) {
                      if (err) throw err;
                      if (res.affectedRows > 0) {
                        console.log(res.affectedRows + " record added successfully!");
                      }
                      console.log("");
                      init();
                    });
                });
            });
          });
    });
  });
}

function updateEmployeeRole() {
  //let array = [];
  var query = "SELECT employee.employee_id as value, " +
    "CONCAT(employee.first_name, ' ', employee.last_name) as name FROM employee WHERE manager_id IS NOT NULL";
  connection.query(query, function (err, res) {
    if (err) throw err;
    let array = JSON.parse(JSON.stringify(res));
    inquirer
      .prompt({
        name: 'employee',
        type: 'list',
        message: 'Which employee\'s role do you want to change?',
        choices: array
      }).then(function (answer1) {
        var query = "SELECT role_id as value, role_title as name FROM role WHERE manager = 0";
        connection.query(query, function (err, res) {
          if (err) throw err;
          let array2 = JSON.parse(JSON.stringify(res));
          inquirer
            .prompt({
              name: 'role',
              type: 'list',
              message: 'Which is the new role?',
              choices: array2
            }).then(function (answer2) {
              connection.query("UPDATE employee SET role_id = ? WHERE employee_id = ?",
                [answer2.role, answer1.employee], function (err, res) {
                  if (err) {
                    if (err.errno === 1451){
                      console.log("You cannot delete this record because of foreign key constrait!");
                    }else{
                      console.log("An error occured!");
                    }
                    return init();
                  }
                  if (res.affectedRows > 0) {
                    console.log(res.affectedRows + " record updated successfully!");
                  }
                  console.log("");
                  init();
                });
            });
        });
      });
  });
}

function updateEmployeeManager() {
  //let array = [];
  var query = "SELECT employee.employee_id as value, " +
    "CONCAT(employee.first_name, ' ', employee.last_name) as name FROM employee WHERE manager_id IS NOT NULL";
  connection.query(query, function (err, res) {
    if (err) throw err;
    let array = JSON.parse(JSON.stringify(res));
    inquirer
      .prompt({
        name: 'employee',
        type: 'list',
        message: 'Which employee\'s manager do you want to change?',
        choices: array
      }).then(function (answer1) {
        var query = "SELECT employee.employee_id as value, CONCAT(employee.first_name, ' ', employee.last_name) as name " +
          "FROM employee INNER JOIN role ON employee.role_id = role.role_id WHERE role.manager = 1";
        connection.query(query, function (err, res) {
          if (err) throw err;
          let array2 = JSON.parse(JSON.stringify(res));
          inquirer
            .prompt({
              name: 'role',
              type: 'list',
              message: 'Who is the new manager?',
              choices: array2
            }).then(function (answer2) {
              connection.query("UPDATE employee SET manager_id = ? WHERE employee_id = ?",
                [answer2.role, answer1.employee], function (err, res) {
                  if (err) {
                    if (err.errno === 1451){
                      console.log("You cannot delete this record because of foreign key constrait!");
                    }else{
                      console.log("An error occured!");
                    }
                    return init();
                  }
                  if (res.affectedRows > 0) {
                    console.log(res.affectedRows + " record updated successfully!");
                  }
                  console.log("");
                  init();
                });
            });
        });
      });
  });
}

function removeDepartment() {
  let array = [];
  var query = "SELECT department_id as value, department_name as name FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    array = JSON.parse(JSON.stringify(res));

    inquirer
      .prompt({
        name: 'department',
        type: 'list',
        message: 'Which department do you want to remove?',
        choices: array
      })
      .then(function (answer) {
          connection.query("DELETE from department WHERE department_id = ?", [answer.department], function (err, res) {
            if (err) {
              if (err.errno === 1451){
                console.log("You cannot delete this record because of foreign key constrait!");
              }else{
                console.log("An error occured!");
              }
              return init();
            }
            if (res.affectedRows > 0) {
              console.log(res.affectedRows + " record deleted successfully!");
            }
            console.log("");
            init();
          });
      });
  });
}

function removeRole() {
  let array = [];
  var query = "SELECT role_id as value, role_title as name FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    array = JSON.parse(JSON.stringify(res));

    inquirer
      .prompt({
        name: 'role',
        type: 'list',
        message: 'Which role do want to remove?',
        choices: array
      })
      .then(function (answer) {
        connection.query("DELETE from role WHERE role_id = ?", [answer.role], function (err, res) {
          if (err) {
            if (err.errno === 1451){
              console.log("You cannot delete this record because of foreign key constrait!");
            }else{
              console.log("An error occured!");
            }
            return init();
          }
          if (res.affectedRows > 0) {
            console.log(res.affectedRows + " record deleted successfully!");
          }
          console.log("");
          init();
        });
      });
  });
}

function removeEmployee() {
  var query = "SELECT employee.employee_id as value, CONCAT(employee.first_name, ' ', employee.last_name) as name " +
    "FROM employee INNER JOIN role ON employee.role_id = role.role_id WHERE role.manager = 0";
  connection.query(query, function (err, res) {
    if (err) throw err;
    let array = JSON.parse(JSON.stringify(res));
    inquirer
      .prompt({
        name: 'employee',
        type: 'list',
        message: 'Which employee do you want to remove?',
        choices: array
      }).then(function (answer) {
        connection.query("DELETE from employee WHERE employee_id = ?", [answer.employee], function (err, res) {
          if (err) {
            if (err.errno === 1451){
              console.log("You cannot delete this record because of foreign key constrait!");
            }else{
              console.log("An error occured!");
            }
            return init();
          }
          if (res.affectedRows > 0) {
            console.log(res.affectedRows + " record deleted successfully!");
          }
          console.log("");
          init();
        });
      });
  });
}


