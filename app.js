import express from "express";
export const app = express();
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
app.use(cors());
app.use(express.json({ limit: "15kb" }));
app.use("/api/v1/auth", authRouter);
