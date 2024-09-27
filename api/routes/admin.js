var express = require("express");
var router = express.Router();

// Admin-only routes
router.get("/dashboard", (req, res) => {
  if (req.user.role_id === 1) {
    // Check if user is an admin
    res.json({ status: "success", message: "Welcome to the Admin Dashboard" });
  } else {
    res.status(403).json({ status: "error", message: "Access denied" });
  }
});

router.post("/manage-users", (req, res) => {
  if (req.user.role_id === 1) {
    // Check if user is an admin
    // Perform admin-only user management tasks here
    res.json({ status: "success", message: "User management completed" });
  } else {
    res.status(403).json({ status: "error", message: "Access denied" });
  }
});

module.exports = router;
