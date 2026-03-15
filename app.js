import express from "express";
const app = express();
export default app;

import employeesRouter from "./api/employees.js";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// every route in employeesRouter.js will start with /employees
// instead of writing it out every time
app.use("/employees", employeesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});
