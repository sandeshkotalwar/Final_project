import React from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/farmer";

const ExpenseTracker = ({ expenses, onUpdate }) => {
  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  // Handle delete expense
  const handleDeleteExpense = async (_id) => {
    try {
      await axios.delete(`${API_URL}/expense/${_id}`);
      onUpdate(); // Refresh the expense list
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("Failed to delete expense: " + error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-green-900 mb-4">Expense Tracker</h2>

      {/* Total Expenses */}
      <div className="bg-green-100 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-green-900">Total Expenses</span>
          <span className="font-bold text-green-900">₹{totalExpenses.toLocaleString()}</span>
        </div>
      </div>

      {/* Expense List */}
      <div className="space-y-3">
        {expenses.map((expense, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col">
              <span className="font-medium text-green-900">{expense.name}</span>
              <span className="text-sm text-green-700">
                {new Date(expense.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-green-900">₹{expense.amount.toLocaleString()}</span>
              <button
                onClick={() => handleDeleteExpense(expense._id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseTracker;