// models/Income.js
const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
