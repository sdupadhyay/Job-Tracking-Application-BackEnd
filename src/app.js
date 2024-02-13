import express from "express";
import cookieParser from "cookie-parser";
export const app = express();
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
app.use(cors());
app.use(express.json({ limit: "15kb" }));
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
