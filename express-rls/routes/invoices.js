const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authenticate = require("../middleware/auth");

router.get("/", authenticate, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM invoices");
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No invoices found" });
    }
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching invoices:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
