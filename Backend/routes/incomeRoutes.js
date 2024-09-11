// routes/incomeRoutes.js
const express = require("express");
const router = express.Router();
const Income = require("./models/Income");

// POST request to add new income
router.post("/", async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    const newIncome = new Income({
      title,
      amount,
      category,
    });

    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ error: "Failed to save income" });
  }
});

module.exports = router;
