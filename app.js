import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { connection } from "./database/connection.js";
import groupRoutes from "./routes/groups.routes.js";
import roleRoutes from "./routes/roles.routes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);  
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

connection();

app.get("/", (req, res) => {
  res.send("✅ SAP SuccessFactors Scraper API running");
});

// Routes
app.use("/api/groups", groupRoutes);
app.use("/api/roles", roleRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
