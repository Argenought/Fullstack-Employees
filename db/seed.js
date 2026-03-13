import db from "./client.js";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 1; i <= 10; i++) {
    await createEmployee(
      "Person" + i,
      "*Insert date here*",
      Math.floor(Math.random() * 99) + 1,
    );
  }
}
