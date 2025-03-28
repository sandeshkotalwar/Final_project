// routes/chatbot.js
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();

// Initialize Google Generative AI
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Chatbot endpoint
router.post("/chat", async (req, res) => {
  const { input } = req.body; // Get user input from the request body

  if (!input) {
    return res.status(400).json({ error: "Input is required" });
  }

  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
    });

    // Start a chat session
    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
      history: [], // You can add chat history here if needed
    });

    // Send the user's input to the model
    const result = await chatSession.sendMessage(input);

    // Send the bot's response back to the frontend
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: "Failed to fetch response from Gemini API" });
  }
});

module.exports = router;