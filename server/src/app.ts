import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { config } from "./config";
import authRoutes from "./routes/auth.js";
import applicationRoutes from "./routes/applications.js";
import analyticsRoutes from "./routes/analytics.js";
import { errorHandler } from "./middleware/error.js";


const app = express();
app.use(helmet());
app.use(cors({ origin: config.clientOrigin }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));


app.get("/health", (_req, res) => res.json({ ok: true }));


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/analytics", analyticsRoutes);


app.use(errorHandler);
export default app;
