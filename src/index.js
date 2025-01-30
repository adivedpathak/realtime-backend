const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("./models/User");  // Import User model
const classroomRoutes = require("./routes/classroomRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Session configuration
app.use(
  session({
    secret: "aditya9322", // Secret key for signing session ID cookie
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true in production if using HTTPS
  })
);

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/classroom_db")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error: " + err));

// Middleware to authenticate user based on session
const authenticate = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "User is not logged in" });
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; 
    next();
  } catch (error) {
    res.status(500).json({ message: "Error during authentication", error: error.message });
  }
};

// Login route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Store user data in session
    req.session.userId = user._id;
    req.session.role = user.role;

    res.status(200).json({ message: "Login successful", role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// Logout route
app.post("/api/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// Protect 
// login aur sign ke baad yaha jaao
app.use("/api/classrooms", authenticate, classroomRoutes);
app.use("/api/assignments", authenticate, assignmentRoutes);

// Routes
app.get("/", (req, res) => {
  res.write("Hello, this is a response!");
  res.end();
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
