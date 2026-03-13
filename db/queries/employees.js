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
  // TODO
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  // TODO
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  // TODO
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  // TODO
}
