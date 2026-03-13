import db from "./client.js";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");
async function seedEmployees() {
  for (let i = 1; i <= 10; i++) {
    const year = Math.floor(Math.random() * 10) + 1990;
    const month = Math.floor(Math.random() * 12) + 1;

    let maxDay;
    if (month === 2) {
      maxDay = 28;
    }
    if (month === 4 || 6 || 9 || 11) {
      maxDay = 30;
    } else {
      maxDay = 31;
    }

    await createEmployee(
      "Person" + i,
      `${year}-${month}-${Math.floor(Math.random() * maxDay) + 1}`,
      Math.floor(Math.random() * 99) + 1,
    );
  }
}
