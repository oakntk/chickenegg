var express = require("express");
var router = express.Router();

// Middleware to restrict access to users
function isUser(req, res, next) {
  const { role_id } = req.user;
  if (role_id === 1) {
    return res
      .status(403)
      .json({ message: "Admins cannot access user routes" });
  }
  next();
}

// Example user routes
router.get("/dashboard", isUser, (req, res) => {
  res.json({ message: "Welcome to the User/Superuser Dashboard!" });
});

router.put("/edit/:id", isUser, (req, res) => {
  // Logic for editing resource (accessible by both superusers and users)
  res.json({ message: `Resource with id ${req.params.id} edited` });
});

module.exports = router;
