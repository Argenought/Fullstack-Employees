import client from "../client.js";

/** @returns the employee created according to the provided details */
export async function createEmployee(name, birthday, salary) {
  const {
    rows: [createdEmployee],
  } = await client.query(
    `
    INSERT INTO employees (name, birthday, salary)
    VAlUES($1, $2, $3)
    RETURNING *;
    `,
    [name, birthday, salary],
  );

  return createdEmployee;
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const {
    rows: [employees],
  } = await client.query(
    `
    SELECT *
    FROM employees
    `,
  );

  return employees;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  const {
    rows: [employee],
  } = await client.query(
    `
    SELECT *
    FROM employees
    WHERE id= $1
    `,
    [id],
  );

  return employee;
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const {
    rows: [employee],
  } = await client.query(
    `
    UPDATE employees
  SET
    name = $2,
    birthday = $3,
    salary = $4
  WHERE id = $1
  RETURNING *
    `,
    [id, name, birthday, salary],
  );

  return employee;
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  const {
    rows: [employee],
  } = await client.query(
    `
    DELETE FROM employees
    WHERE id =$1
    RETURNING *
    `,
    [id],
  );

  return employee;
}
