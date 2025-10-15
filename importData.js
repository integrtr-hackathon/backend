import fs from "fs";
import fetch from "node-fetch";

const raw = fs.readFileSync("./scraped.txt", "utf8");

fetch("http://localhost:5000/api/groups/import", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ raw }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log("✅ Import complete:");
    console.log(data);
  })
  .catch((err) => console.error("❌ Error:", err));
