import React, { useState } from "react";
import axios from "axios";

const SimpleChatbotModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [showPrompts, setShowPrompts] = useState(false); // Toggle quick questions

  // Common agriculture-related prompts
  const commonPrompts = [
    "How do I improve soil fertility?",
    "What are the best crops for this season?",
    "How can I control pests naturally?",
    "What is the ideal irrigation method for my crops?",
    "How do I prevent crop diseases?",
  ];

  // Format the bot's response for better readability
  const formatResponse = (text) => {
    // Split the response into lines and add line breaks
    return text.split("\n").map((line, index) => (
      <p key={index} className="mb-2">
        {line}
      </p>
    ));
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to chat history
    const userMessage = { sender: "user", text: input };
    setChatHistory((prev) => [...prev, userMessage]);

    setIsLoading(true); // Set loading to true

    try {
      // Call the backend chatbot endpoint
      const response = await axios.post("http://localhost:5000/api/chatbot/chat", {
        input: input,
      });

      // Format the bot's response
      const botResponse = formatResponse(response.data.response);

      // Add bot's response to chat history
      const botMessage = { sender: "bot", text: botResponse };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response from backend:", error);
      const errorMessage = { sender: "bot", text: "Sorry, I could not get a response." };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // Set loading to false
      setInput(""); // Clear input field
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      {/* Increase width to 70% on large screens */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md lg:w-[50%] lg:max-w-none overflow-hidden transform transition-all duration-300 ease-in-out">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-800 to-green-600 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Agrivo Bot</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat History */}
        <div className="overflow-y-auto max-h-60 p-4 bg-gray-50 scrollbar-hide">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <span
                className={`inline-block p-3 rounded-lg max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}

          {/* Show "Getting answer..." while loading */}
          {isLoading && (
            <div className="flex justify-start">
              <span className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800">
                Getting answer...
              </span>
            </div>
          )}
        </div>

        {/* Expandable Quick Questions */}
        <div className="p-4 bg-green-50 border-t border-green-100">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-green-800">Quick Questions:</h3>
            <button
              onClick={() => setShowPrompts(!showPrompts)}
              className="text-green-800 hover:text-green-900 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={showPrompts ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
                />
              </svg>
            </button>
          </div>
          {showPrompts && (
            <div className="mt-2 flex flex-wrap gap-2">
              {commonPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInput(prompt)}
                  className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ask me anything about agriculture..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading} // Disable input while loading
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-green-500 to-green-700 text-white p-2 rounded-lg hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              disabled={isLoading} // Disable button while loading
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleChatbotModal;