const express = require("express");
require("dotenv").config(); // Ensure environment variables are loaded
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const pool = require("./config/db");
const ordersRoute = require("./routes/orders");
const invoicesRoute = require("./routes/invoices");
const authRoute = require("./routes/auth");

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/orders", ordersRoute);
app.use("/api/invoices", invoicesRoute);
app.use("/api/auth", authRoute);

// Health check route (optional)
app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

// Handle unexpected shutdowns
process.on("SIGINT", () => {
  console.log("Closing database pool");
  pool.end(() => {
    console.log("Database pool closed");
    process.exit(0);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
