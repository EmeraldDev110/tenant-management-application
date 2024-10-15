const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables from .env file

// Create a new Pool instance to manage database connections
const pool = new Pool({
  user: process.env.DB_USER, // Database user
  host: process.env.DB_HOST, // Database host (usually 'localhost' for local development)
  database: process.env.DB_NAME, // Database name
  password: process.env.DB_PASSWORD, // Database password
  port: process.env.DB_PORT, // Database port (5432 for PostgreSQL by default)
});

// Event listener for when the pool successfully connects to the database
pool.on("connect", () => {
  console.log("Connected to the database");
});

// Event listener for handling unexpected errors in idle clients
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1); // Exit process with failure code if there is an unexpected error
});

module.exports = pool; // Export the pool instance for use in other modules
