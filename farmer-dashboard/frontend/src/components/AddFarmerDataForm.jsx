import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import ExpenseTracker from "./ExpenseTracker";

const API_URL = 'http://localhost:5000/api/farmer';

const AddFarmerDataForm = ({ onDataAdded, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    revenue: "",
    land: "", 
    production: [{ month: "", kg: "" }],
    storage: [{ crop: "", percentage: "" }],
    todo: [{ task: "", dueDate: "", dueTime: "", completed: false }],
  });
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split("T")[0]);

  const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const fetchExistingData = async () => {
      if (isOpen) {
        try {
          const response = await axios.get(API_URL);
          if (response.data) {
            const data = response.data;
            if (data.todo) {
              data.todo = data.todo.map(task => ({
                ...task,
                completed: task.completed || false,
                dueDate: task.dueDate ? task.dueDate.split('T')[0] : "",
                dueTime: task.dueTime || ""
              }));
            }
            setFormData({
              revenue: data.revenue || "",
              land: data.land || "",
              production: Array.isArray(data.production) ? data.production : [{ month: "", kg: "" }],
              storage: Array.isArray(data.storage) ? data.storage : [{ crop: "", percentage: "" }],
              todo: Array.isArray(data.todo) ? data.todo : [{ task: "", dueDate: "", dueTime: "", completed: false }]
            });
            setExpenses(data.expenses || []);
          }
        } catch (error) {
          console.error("Error fetching existing data:", error);
          setFormData({
            revenue: "",
            land: "",
            production: [{ month: "", kg: "" }],
            storage: [{ crop: "", percentage: "" }],
            todo: [{ task: "", dueDate: "", dueTime: "", completed: false }]
          });
        }
      }
    };
    fetchExistingData();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductionChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newProduction = [...prev.production];
      newProduction[index] = { ...newProduction[index], [name]: value };
      return { ...prev, production: newProduction };
    });
  };

  const handleStorageChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newStorage = [...prev.storage];
      newStorage[index] = { ...newStorage[index], [name]: value };
      return { ...prev, storage: newStorage };
    });
  };

  const handleTodoChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newTodo = [...prev.todo];
      newTodo[index] = { ...newTodo[index], [name]: value };
      return { ...prev, todo: newTodo };
    });
  };

  const addProductionField = () => {
    setFormData(prev => ({
      ...prev,
      production: [...prev.production, { month: "", kg: "" }]
    }));
  };

  const addStorageField = () => {
    setFormData(prev => ({
      ...prev,
      storage: [...prev.storage, { crop: "", percentage: "" }]
    }));
  };

  const addTodoField = () => {
    setFormData(prev => ({
      ...prev,
      todo: [...prev.todo, { task: "", dueDate: "", dueTime: "", completed: false }]
    }));
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!expenseName || !expenseAmount) {
      alert("Please fill in all fields");
      return;
    }

    const newExpense = {
      name: expenseName,
      amount: Number(expenseAmount),
      date: expenseDate,
    };

    try {
      const response = await axios.post(`${API_URL}/expense`, newExpense);
      setExpenses([...expenses, response.data]); // Update expenses state
      setExpenseName("");
      setExpenseAmount("");
      setExpenseDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.revenue || !formData.land) {
        alert("Please fill in all required fields");
        return;
      }

      const invalidProduction = formData.production.some(p => !p.month || !p.kg);
      if (invalidProduction) {
        alert("Please fill in all production fields");
        return;
      }

      const invalidStorage = formData.storage.some(s => !s.crop || !s.percentage);
      if (invalidStorage) {
        alert("Please fill in all storage fields");
        return;
      }

      const invalidTodo = formData.todo.some(t => !t.task || !t.dueDate || !t.dueTime);
      if (invalidTodo) {
        alert("Please fill in all todo fields");
        return;
      }

      const formattedData = {
        revenue: parseFloat(formData.revenue),
        land: formData.land,
        production: formData.production.map(p => ({ 
          month: p.month,
          kg: parseFloat(p.kg)
        })),
        storage: formData.storage.map(s => ({
          crop: s.crop,
          percentage: parseFloat(s.percentage)
        })),
        todo: formData.todo.map(task => ({
          task: task.task,
          dueDate: task.dueDate,
          dueTime: task.dueTime,
          completed: task.completed || false
        })),
        expenses: expenses
      };

      const response = await axios.post(API_URL, formattedData);
      
      if (response.status === 200) {
        console.log("Server response:", response.data);
        alert("Data updated successfully!");
        onDataAdded();
        onClose();
        setFormData({
          revenue: "",
          land: "",
          production: [{ month: "", kg: "" }],
          storage: [{ crop: "", percentage: "" }],
          todo: [{ task: "", dueDate: "", dueTime: "", completed: false }],
        });
        setExpenses(response.data.expenses || []);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update data. Please check your input and try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-green-900 mb-4">Add Farmer Data</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Revenue Field */}
          <div>
            <label className="block text-sm font-medium text-green-700">Revenue</label>
            <input
              type="number"
              name="revenue"
              value={formData.revenue}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Land Field */}
          <div>
            <label className="block text-sm font-medium text-green-700">Land</label>
            <input
              type="text"
              name="land"
              value={formData.land}
              onChange={handleChange}
              className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Production Fields */}
          <div>
            <label className="block text-sm font-medium text-green-700">Production</label>
            {formData.production.map((prod, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <select
                  name="month"
                  value={prod.month}
                  onChange={(e) => handleProductionChange(index, e)}
                  className="w-1/2 p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Month</option>
                  {monthOptions.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <input
                  type="number"
                  name="kg"
                  value={prod.kg}
                  onChange={(e) => handleProductionChange(index, e)}
                  placeholder="Production (kg)"
                  className="w-1/2 p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addProductionField}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
            >
              Add More Production
            </button>
          </div>

          {/* Storage Fields */}
          <div>
            <label className="block text-sm font-medium text-green-700">Storage</label>
            {formData.storage.map((store, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <input
                  type="text"
                  name="crop"
                  value={store.crop}
                  onChange={(e) => handleStorageChange(index, e)}
                  placeholder="Crop"
                  className="w-1/2 p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <input
                  type="number"
                  name="percentage"
                  value={store.percentage}
                  onChange={(e) => handleStorageChange(index, e)}
                  placeholder="Percentage"
                  className="w-1/2 p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  min="0"
                  max="100"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addStorageField}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
            >
              Add More Storage
            </button>
          </div>

          {/* To-Do Fields */}
          <div>
            <label className="block text-sm font-medium text-green-700">To-Do List</label>
            {formData.todo.map((task, index) => (
              <div key={index} className="mb-2 space-y-2">
                <input
                  type="text"
                  name="task"
                  value={task.task}
                  onChange={(e) => handleTodoChange(index, e)}
                  placeholder="Task"
                  className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <div className="flex gap-4">
                  <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={(e) => handleTodoChange(index, e)}
                    className="w-1/2 p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                  <input
                    type="time"
                    name="dueTime"
                    value={task.dueTime}
                    onChange={(e) => handleTodoChange(index, e)}
                    className="w-1/2 p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addTodoField}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
            >
              Add More Tasks
            </button>
          </div>

          {/* Add Expense Section */}
          <div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">Add Expense</h3>
            <div className="flex gap-4 mb-2">
              <input
                type="text"
                placeholder="Expense Name"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                className="w-1/2 p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                placeholder="Amount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="w-1/4 p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                min="0"
                step="0.01"
              />
              <input
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className="w-1/4 p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="button"
              onClick={handleAddExpense}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-lg w-full hover:from-green-600 hover:to-green-700 transition-all duration-200"
            >
              Add Expense
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-lg w-full hover:from-green-600 hover:to-green-700 transition-all duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddFarmerDataForm;