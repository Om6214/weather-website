import express from "express";
import { config } from "dotenv";
import cors from "cors";
import db from"./config/conn.js";
const port = 5000;

import authRoutes from "./routers/authRoutes.js"
import weatherRoutes from "./routers/weatherRoutes.js"

config();

const app = express();
app.use(express.json())
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);

// Check database connection
db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MYSQL connected");
  });

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
