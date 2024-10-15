const jwt = require("jsonwebtoken");
const pool = require("../config/db");
require("dotenv").config(); // Ensure environment variables are loaded

const authenticate = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      // Log missing token for debugging purposes (can be extended with more context)
      console.error("Authentication error: No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Ensure tenant_id exists in the decoded token
    if (!req.user.tenant_id) {
      console.error("Authentication error: Tenant ID missing in token payload");
      return res.status(400).json({ message: "Invalid token payload" });
    }

    // Set the tenant for the session in PostgreSQL
    await pool.query(`SET app.current_tenant = ${req.user.tenant_id}`);

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle different token errors
    if (err.name === "TokenExpiredError") {
      console.error("Authentication error: Token expired");
      return res.status(401).json({ message: "Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      console.error("Authentication error: Invalid token");
      return res.status(401).json({ message: "Invalid token" });
    }

    // Log any unexpected error for debugging
    console.error("Authentication error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authenticate;
