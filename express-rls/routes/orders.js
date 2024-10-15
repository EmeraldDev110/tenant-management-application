const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authenticate = require("../middleware/auth");

router.get("/", authenticate, async (req, res) => {
  try {
    // Log the current tenant setting for debugging
    const tenantSetting = await pool.query(
      "SELECT current_setting('app.current_tenant')"
    );

    // Query orders for the current tenant
    const result = await pool.query("SELECT * FROM orders");
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this tenant" });
    }

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
