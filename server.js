// Suppress punycode deprecation warning (DEP0040) triggered by transitive dependencies in Node v21+
process.removeAllListeners("warning");
process.on("warning", (warning) => {
  if (warning.name === "DeprecationWarning" && warning.code === "DEP0040") return;
  console.warn(warning);
});

require("dotenv").config();
const express   = require("express");
const cors      = require("cors");
const connectDB = require("./config/db");

// ── Connect to MongoDB ────────────────────────────────────────────────────
connectDB();

const app = express();

// ── Security Hardening ────────────────────────────────────────────────────
app.disable("x-powered-by");
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// ── Middleware ────────────────────────────────────────────────────────────
app.use(cors({ 
  origin: [
    process.env.CLIENT_URL || "http://localhost:3000", 
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    "http://localhost:3005"
  ], 
  credentials: true 
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ── Health check ──────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() })
);

app.get("/", (req, res) => {
  res.send("TalentStack API is running...");
});

// ── Routes ────────────────────────────────────────────────────────────────
app.use("/api/auth",       require("./routes/auth"));
app.use("/api/courses",    require("./routes/courses"));
app.use("/api/mentors",    require("./routes/mentors"));
app.use("/api/placements", require("./routes/placements"));
app.use("/api/blogs",      require("./routes/blogs"));
app.use("/api/sessions",   require("./routes/sessions"));
app.use("/api/upload",     require("./routes/upload"));

// ── 404 fallback ──────────────────────────────────────────────────────────
app.all("*", (req, res) =>
  res.status(404).json({ status: "fail", message: `Route ${req.originalUrl} not found` })
);

// ── Global error handler ──────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ status: "error", message: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀  Server running on http://localhost:${PORT}`));
