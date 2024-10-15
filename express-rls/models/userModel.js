const pool = require("../config/db");

// Find user by email with error handling
const findUserByEmail = async (email) => {
  try {
    // Query the database for the user by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // Check if a user is found, return null if not
    if (result.rows.length === 0) {
      return null;
    }

    // Return the user data if found
    return result.rows[0];
  } catch (error) {
    console.error(`Error finding user by email: ${error.message}`);
    throw new Error("Database query failed");
  }
};

module.exports = {
  findUserByEmail,
};
