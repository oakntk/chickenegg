var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const secret = "Private-ChickenEgg";
app.use(cors());

// Import admin and user routes
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

const saltRounds = 10;

// Use body parser
app.use(bodyParser.json());

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "ibsdo.com",
  user: "ibsdo",
  password: "#wyT6G5iQg36",
  database: "ChickenEgg",
  port: 3306,
});

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = decoded;
    next();
  });
}

app.post("/login", jsonParser, (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.json({
      status: "error",
      message: "Email and password are required!",
    });
  }

  connection.execute(
    "SELECT * FROM users WHERE email = ?",
    [email],
    function (err, users) {
      if (err) {
        console.error("Database error:", err); // Log database error
        return res.json({ status: "error", message: "Database error" });
      }
      if (users.length === 0) {
        return res.json({ status: "error", message: "No user found!" });
      }

      bcrypt.compare(password, users[0].password, (err, isLogin) => {
        if (err) {
          console.error("Bcrypt error:", err); // Log bcrypt error
          return res.json({
            status: "error",
            message: "Error processing password.",
          });
        }
        if (isLogin) {
          const token = jwt.sign(
            { email: users[0].email, role_id: users[0].role_id },
            secret,
            { expiresIn: "1d" }
          );
          res.json({
            status: "success",
            message: "Login successful!",
            token,
            role_id: users[0].role_id, // Send role_id in the response
          });
        } else {
          res.json({ status: "error", message: "Login failed!" });
        }
      });
    }
  );
});

app.post("/register", jsonParser, async (req, res) => {
  console.log("Request body:", req.body);

  if (!req.body) {
    return res
      .status(400)
      .json({ status: "error", message: "Request body is required." });
  }

  const { email, password, fname, lname } = req.body;

  if (!email || !password || !fname || !lname) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required." });
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    await connection
      .promise()
      .execute(
        "INSERT INTO users (email, password, fname, lname) VALUES (?, ?, ?, ?)",
        [email, hash, fname, lname]
      );

    res.json({ status: "success", message: "Register successful!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ status: "error", message: "Registration failed." });
  }
});

app.use("/admin", authenticateToken, adminRoutes);
app.use("/user", authenticateToken, userRoutes);

// Start the server
app.listen(3333, () => {
  console.log("Server running on port 3333");
});
