import express from "express";
import cors from "cors";
import "dotenv/config";

import healthRouter from "./routes/healthRoutes.js";
import authRouter from "./routes/authRoutes.js";
import profileRouter from "./routes/profileRoutes.js";

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
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);

export default app;
