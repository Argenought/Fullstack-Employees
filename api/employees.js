import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../db/queries/employees.js";
import express from "express";
const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.post("/", async (req, res) => {
  // If no body  return respone 400           Response sent to client
  if (!req.body) return res.status(400).send("Request body required.");

  // what is stored in req.body
  const { name, birthday, salary } = req.body;

  // If any of these are missing return status 400 and response is missing field
  if (!name || !birthday || !salary) {
    return res
      .status(400)
      .send("Missing required fields: name, birthday, salary");
  }

  // waits to run createEmployee and stores that info into employee
  const employee = await createEmployee(name, birthday, salary);
  // lets client know the employee has been created, and the information they gave
  res.status(201).send(employee);
});

/* 
What I first wrote

router.get("/:id", async (req, res) => {
  const employee = await getEmployee(id);
   res.send(employee);
 });

 seemed to be missing const {id}=req.params;

 */

// param is made here so it can be used in getEmployee, updateEmployee, and deleteEmployee
// save work needing to type it out in every route instead it will check the id then next()
// will search for the route that fits the request
// also this will have all the same 404 error for all the requests
router.param("id", async (req, res, next, id) => {
  const employee = await getEmployee(id);
  if (!employee) return res.status(404).send("Employee not found.");

  req.employee = employee;
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.employee);
});

router.delete("/:id", async (req, res) => {
  await deleteEmployee(req.employee.id);
  // incorrect res.status(204).send(employee);
  res.sendStatus(204);
  // can also write res.status(204).send();
});

router.put("/:id", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body required.");

  const { name, birthday, salary } = req.body;

  if (!name || !birthday || !salary) {
    return res
      .status(400)
      .send("Missing required fields: name, birthday, salary");
  }

  const employee = await updateEmployee(
    req.employee.id,
    name,
    birthday,
    salary,
  );

  res.status(200).send(employee);
});
