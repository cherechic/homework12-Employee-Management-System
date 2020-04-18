
# EmployeeTracker
### Unit 12 MySQL Homework: Employee Tracker

This is a Employee Management application which can be invoked with the following code. 

```sh
npm start
```
The database designed as below schema:

![Alt Text](./Assets/schema.png)

User can run 14 different queries which are shown below:

```sh
What would you like to do? 
  1) View Departments
  2) View Roles
  3) View All Employees
  4) View Employees by Department
  5) View Employees by Manager
  6) View The Total Utilized Budget of a Department
  7) Add Department
  8) Add Role
  9) Add Employee
  10) Update Employee Role
  11) Update Employee Manager
  12) Remove Department
  13) Remove Role
  14) Remove Employee
  15) Exit
(Move up and down to reveal more choices)
  Answer: 15
```
Some queries and their results listed down:

Add Employee:
```sh
? What would you like to do? Add Employee
? What is your first name? Mahir
? What is your last name? Erden
? Choose a role for the new employee 
  Software Engineer
  Accountant
  Financial Analyst
  Lawyer
  Sales Person
> Front End Developer
? Choose a role for the new employee Front End Developer
? Choose a manager for the new employee (Use arrow keys)
> Kenon Lait
  Jeddy Mathewes
  Clem Heskin
  Dara Kynnd
? Choose a manager for the new employee Kenon Lait
1 record added successfully!
```
View All Employee:
```sh
? What would you like to do? View All Employees
┌─────────┬─────────────┬───────────────┬───────────────────────┬─────────────────┐
│ (index) │ first_name  │   last_name   │      role_title       │ department_name │
├─────────┼─────────────┼───────────────┼───────────────────────┼─────────────────┤
│    0    │   'Kenon'   │    'Lait'     │    'Lead Engineer'    │  'Engineering'  │
│    1    │   'Jeddy'   │  'Mathewes'   │   'Finance Manager'   │    'Finance'    │
│    2    │   'Clem'    │   'Heskin'    │ 'Legal Team Leader '  │     'Legal'     │
│    3    │  'Sarena'   │    'Ruane'    │    'Sales Person'     │     'Sales'     │
│    4    │ 'Johnathan' │   'Fitton'    │  'Software Engineer'  │  'Engineering'  │
│    5    │   'Dara'    │    'Kynnd'    │    'Sales Manager'    │     'Sales'     │
│    6    │   'Arie'    │   'Juliff'    │    'Sales Person'     │     'Sales'     │
│    7    │  'Nikolas'  │ 'Klimkowski'  │    'Sales Person'     │     'Sales'     │
│    8    │    'Pet'    │   'Bunton'    │  'Software Engineer'  │  'Engineering'  │
│    9    │   'Niko'    │   'Pendall'   │  'Financial Analyst'  │    'Finance'    │
│   10    │  'Issiah'   │   'Ledwich'   │       'Lawyer'        │     'Legal'     │
│   11    │  'Jordan'   │ 'Bottlestone' │    'Sales Person'     │     'Sales'     │
│   12    │   'Dotty'   │  'Navarijo'   │    'Sales Person'     │     'Sales'     │
│   13    │   'Lilas'   │    'Wike'     │     'Accountant'      │    'Finance'    │
│   14    │   'Mahir'   │    'Erden'    │ 'Front End Developer' │  'Engineering'  │
└─────────┴─────────────┴───────────────┴───────────────────────┴─────────────────┘
```


View Employees by Department:
```sh
? What would you like to do? View Employees by Department
? Which department's employees do you want to see? Legal
┌─────────┬────────────┬────────────┬──────────────────────┬─────────────────┐
│ (index) │ first_name │ last_name  │      role_title      │ department_name │
├─────────┼────────────┼────────────┼──────────────────────┼─────────────────┤
│    0    │   'Clem'   │  'Heskin'  │ 'Legal Team Leader ' │     'Legal'     │
│    1    │  'Tanya'   │ 'Picknett' │       'Lawyer'       │     'Legal'     │
│    2    │  'Issiah'  │ 'Ledwich'  │       'Lawyer'       │     'Legal'     │
└─────────┴────────────┴────────────┴──────────────────────┴─────────────────┘
```

Add Role:
```sh
? What would you like to do? Add Role
? What is the name of the new role? Front End Developer
? What is the salary of this new role? 60000e
>> Salary should be a number!
? What is the salary of this new role? 60000
? which department is the new role belongs? Engineering
> Engineering
  Finance
  Legal
  Sales
? Is this a manager role? No 
1 record added successfully!
```
Update Employee Manager:
```sh
? What would you like to do? Update Employee Manager
? Which employee's manager do you want to change? 
  Issiah Ledwich
  Jordan Bottlestone
  Dotty Navarijo
> Lilas Wike
  Tanya Picknett
  Sarena Ruane
  Johnathan Fitton
  ? Who is the new manager? (Use arrow keys)
> Kenon Lait
  Jeddy Mathewes
  Clem Heskin
  Dara Kynnd
```

Remove Department:
```sh
? What would you like to do? Remove Department
? Which department do you want to remove?
> Engineering
  Finance
  Legal
  Sales
? Which department do you want to remove? Engineering
You cannot delete this record because of foreign key constrait
```

User can create and seed the database by running or copying schema.sql and seed.sql files in the Assets folder.

schema.sql
```sh
DROP DATABASE IF EXISTS employee_managerDB;
CREATE database employee_managerDB;

USE employee_managerDB;

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE role(
  role_id INT NOT NULL AUTO_INCREMENT,
  role_title VARCHAR(30) NOT NULL,
  role_salary DECIMAL(8,0) NULL,
  department_id INT NOT NULL,
  manager BOOLEAN NOT NULL default 0, 
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id) REFERENCES department(department_id),
);

CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (role_id) REFERENCES role(role_id),
  FOREIGN KEY (manager_id) REFERENCES employee(employee_id)
);
```
seed.sql (A few insert statement shown below)

```sh
INSERT INTO employee_managerdb.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (1, "Tanya", "Picknett", 7, 4);

INSERT INTO employee_managerdb.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (2, "Kenon", "Lait", 1, Null);

INSERT INTO employee_managerdb.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (3, "Jeddy", "Mathewes", 3, Null);

INSERT INTO employee_managerdb.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (4, "Clem", "Heskin", 6, Null);

INSERT INTO employee_managerdb.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (5, "Sarena", "Ruane", 9, 7);
```

Also department.csv, employee.csv, and role.csv files can be found in the Assets folder.
