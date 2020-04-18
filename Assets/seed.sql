INSERT INTO employee_managerdb.department (department_id, department_name)
VALUES (1, "Engineering");

INSERT INTO employee_managerdb.department (department_id, department_name)
VALUES (2, "Finance");

INSERT INTO employee_managerdb.department (department_id, department_name)
VALUES (3, "Legal");

INSERT INTO employee_managerdb.department (department_id, department_name)
VALUES (4, "Sales");


INSERT INTO employee_managerdb.role (role_id, role_title, role_salary, department_id, manager)
VALUES (1, "Lead Engineer", 100000, 1, 1);

INSERT INTO employee_managerdb.role (role_id, role_title, role_salary, department_id, manager)
VALUES (2, "Software Engineer", 80000, 1, 0);

INSERT INTO employee_managerdb.role (role_id, role_title, role_salary, department_id, manager)
VALUES (3, "Finance Manager", 100000, 2, 1);

INSERT INTO employee_managerdb.role (role_id, role_title, role_salary, department_id, manager)
VALUES (4, "Accountant", 60000, 2, 0);

INSERT INTO employee_managerdb.role (role_id, role_title, role_salary, department_id, manager)
VALUES (5, "Financial Analyst", 70000, 2, 0);

INSERT INTO employee_managerdb.role (role_id, role_title, role_salary, department_id, manager)
VALUES (6, "Legal Team Leader ", 90000, 3, 1);

INSERT INTO employee_managerdb.role (role_id, role_title, role_salary, department_id, manager)
VALUES (7, "Lawyer", 80000, 3, 0);

INSERT INTO employee_managerdb.role (role_id, role_title, role_salary, department_id, manager)
VALUES (8, "Sales Manager", 80000, 4, 1);

INSERT INTO employee_managerdb.role (role_id, role_title, role_salary, department_id, manager)
VALUES (9, "Sales Person", 50000, 4, 0);


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

INSERT INTO employee_managerdb.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (6, "Johnathan", "Fitton", 2, 2);

INSERT INTO employee_managerdb.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (7, "Dara", "Kynnd", 8, Null);

INSERT INTO employee_managerdb.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (8, "Arie", "Juliff", 9, 7);

INSERT INTO employee_managerdb.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (9, "Nikolas", "Klimkowski", 9, 7);

INSERT INTO employee_managerdb.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (10, "Pet", "Bunton", 2, 2);

INSERT INTO employee_managerdb.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (11, "Niko", "Pendall", 5, 3);

INSERT INTO employee_managerdb.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (12, "Issiah", "Ledwich", 7, 4);

INSERT INTO employee_managerdb.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (13, "Jordan", "Bottlestone", 9, 7);

INSERT INTO employee_managerdb.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (14, "Dotty", "Navarijo", 9, 7);

INSERT INTO employee_managerdb.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (15, "Lilas", "Wike", 4, 3);




