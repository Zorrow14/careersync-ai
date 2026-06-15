import express from "express";
import cors from "cors";
import "dotenv/config";

import healthRouter from "./routes/healthRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", healthRouter);

export default app;
