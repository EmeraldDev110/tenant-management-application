const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../models/userModel");

// Login route to authenticate the user and generate JWT
router.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        tenant_id: user.tenant_id, // Include tenant_id in token payload
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, username: user.email });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
