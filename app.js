import express from "express";
import dotenv from "dotenv";
import { connection } from "./database/connection.js";
import groupRoutes from "./routes/groups.routes.js";

dotenv.config();
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

connection();

app.get("/", (req, res) => {
  res.send("✅ SAP SuccessFactors Scraper API running");
});

// Routes
app.use("/api/groups", groupRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
