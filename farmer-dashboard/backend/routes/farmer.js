const express = require("express");
const FarmerData = require("../models/FarmerData");

const router = express.Router();

// Update Farmer Data
router.post("/", async (req, res) => {
  try {
    const { revenue, land, production, storage, todo } = req.body;

    // Validate required fields
    if (!revenue || !land) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Use findOneAndUpdate to atomically find and update the document
    const farmerData = await FarmerData.findOneAndUpdate(
      {}, // Empty filter to match first document
      {
        revenue,
        land,
        production,
        storage,
        todo,
      },
      {
        new: true, // Return updated document
        upsert: true, // Create if doesn't exist
        runValidators: true, // Run model validations
      }
    );

    res.status(200).json({
      message: "Data updated successfully",
      data: farmerData,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({
      message: "Error updating data",
      error: error.message,
    });
  }
});

// Get Farmer Data
router.get("/", async (req, res) => {
  try {
    const data = await FarmerData.findOne().lean(); // Use lean() for better performance

    if (!data) {
      return res.status(404).json({ message: "No farmer data found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      message: "Failed to fetch data",
      error: error.message,
    });
  }
});

// Delete a Todo Item
router.delete("/todo/:_id", async (req, res) => {
  try {
    const { _id } = req.params; // Extract the ID from the request parameters
    const farmerData = await FarmerData.findOneAndUpdate(
      {}, // Empty filter to match first document
      { $pull: { todo: { _id } } }, // Use $pull to remove the todo item by ID
      { new: true } // Return the updated document
    );

    if (!farmerData) {
      return res.status(404).json({ message: "No farmer data found" });
    }

    res.status(200).json({
      message: "Todo item deleted successfully",
      data: farmerData,
    });
  } catch (error) {
    console.error("Error deleting todo item:", error);
    res.status(500).json({
      message: "Error deleting todo item",
      error: error.message,
    });
  }
});

// Add Expense
router.post("/expense", async (req, res) => {
  const { name, amount, date } = req.body;
  try {
    const farmerData = await FarmerData.findOne();
    if (!farmerData) {
      return res.status(404).json({ message: "Farmer data not found" });
    }

    // Add the new expense
    farmerData.expenses.push({ name, amount, date });
    await farmerData.save();

    res.status(200).json({
      message: "Expense added successfully",
      expenses: farmerData.expenses,
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({
      message: "Error adding expense",
      error: error.message,
    });
  }
});

// Delete Expense
router.delete("/expense/:_id", async (req, res) => {
  const { _id } = req.params; // Extract the expense ID from the request parameters
  try {
    const farmerData = await FarmerData.findOneAndUpdate(
      {}, // Empty filter to match first document
      { $pull: { expenses: { _id } } }, // Use $pull to remove the expense by ID
      { new: true } // Return the updated document
    );

    if (!farmerData) {
      return res.status(404).json({ message: "Farmer data not found" });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
      expenses: farmerData.expenses,
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({
      message: "Error deleting expense",
      error: error.message,
    });
  }
});

module.exports = router;