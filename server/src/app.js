const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const projectRoutes = require("./features/projects/project.routes");
const healthRoutes = require("./features/health/health.routes");
const authRoutes = require("./features/auth/dto/interfaces/auth.routes");

const app = express();

/* ✅ Proper CORS */
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

/* ❌ REMOVE app.options("*", cors(...)) */

/* ✅ Helmet */
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/health", healthRoutes);
app.use("/api", authRoutes);
app.use("/api", projectRoutes);

module.exports = app;