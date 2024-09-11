// server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const incomeRoutes = require("./routes/incomeRoutes");

app.use(express.json()); // Middleware to parse JSON request bodies

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/JS_expenseTracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the income routes
app.use("/api/income", incomeRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
