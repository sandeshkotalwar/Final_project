const mongoose = require("mongoose");

const FarmerDataSchema = new mongoose.Schema({
  revenue: String,
  land: String,
  production: [{ 
    month: String, 
    kg: String 
  }],
  storage: [{ 
    crop: String, 
    percentage: String 
  }],
  todo: [{
    task: String,
    dueDate: String,
    dueTime: String,
    completed: Boolean
  }],
  expenses: [{
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
});

module.exports = mongoose.model("FarmerData", FarmerDataSchema);