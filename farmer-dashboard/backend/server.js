const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Ensure you have a User model

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from the frontend
app.use(express.json()); // Parse JSON data
app.use(morgan("dev")); // Log HTTP requests
app.use(helmet()); // Secure HTTP headers
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Rate limiting

// Import routes
const plantRoutes = require("./routes/plant");
const farmerRoutes = require("./routes/farmer"); // Import farmer routes
const chatbotRoutes = require("./routes/chatbot"); // Import chatbot routes
const authRoutes = require('./routes/auth');

// Use routes
app.use("/api/plant", plantRoutes);
app.use("/api/farmer", farmerRoutes); // Mount farmer routes
app.use("/api/chatbot", chatbotRoutes); // Mount chatbot routes
app.use('/api/auth', authRoutes);

// Add the /api/user route
app.get('/api/user', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract the token
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Verify the token (e.g., using JWT)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId); // Fetch user from database

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user's name (or other details) as JSON
        res.json({ name: user.name });
    } catch (error) {
        console.error('Error in /api/user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/farmer_dashboard";

mongoose
  .connect(mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});