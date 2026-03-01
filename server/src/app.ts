import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import projectRoutes from "./features/projects/project.routes";
import healthRoutes from "./features/health/health.routes";
import authRoutes from "./features/auth/auth.routes";

const app = express();

/* ✅ Proper CORS */
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json());
app.use(cookieParser());

/* Routes */
app.use("/health", healthRoutes);
app.use("/api", authRoutes);
app.use("/api", projectRoutes);

export default app;