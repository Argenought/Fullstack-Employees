DROP TABLE IF EXISTS employees;

CREATE TABLE employees(
  id SERIAL PRIMARY KEY,
  name TEXT,
  birthday DATE,
  salary INT
)