import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the database
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/farmer");
      if (response.data && Array.isArray(response.data.todo)) {
        setTodos(response.data.todo);
      } else {
        console.error("Invalid data structure");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleComplete = async (todo) => {
    try {
      await axios.delete(`http://localhost:5000/api/farmer/todo/${todo._id}`);
      // Update local state to remove the deleted item
      setTodos((prevTodos) => prevTodos.filter((t) => t._id !== todo._id));
    } catch (error) {
      console.error("Error completing todo:", error);
      alert("Failed to complete todo: " + error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-green-900 mb-4">To-Do List</h2>
      <ul className="space-y-3">
        {Array.isArray(todos) && todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col">
              <span className="font-medium text-green-900">{todo.task}</span>
              <div className="text-sm text-gray-500">
                <span>Due: {todo.dueDate} at {todo.dueTime}</span>
              </div>
            </div>
            <button
              onClick={() => handleComplete(todo)}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
            >
              Complete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;