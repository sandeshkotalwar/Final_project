const express = require("express");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Crop.Health API details
const CROP_HEALTH_API_URL = "https://crop.kindwise.com/api/v1/identification";
const CROP_HEALTH_API_KEY = "z7Hbwhk1sx2wyxwR1ZDj9OqNgGakDmQ6plJjGSJByMnN38HtiX"; // Keep this secret in .env

// Route to handle image upload and send to Crop.Health API
router.post("/identify", upload.single("image"), async (req, res) => {
  try {
    console.log("Request received. Checking file upload...");

    if (!req.file) {
      console.error("No file uploaded.");
      return res.status(400).json({ error: "No file uploaded." });
    }

    const imagePath = req.file.path;
    console.log("File uploaded successfully:", imagePath);

    // Read image file as base64
    const imageBase64 = fs.readFileSync(imagePath, "base64");
    const base64Image = `data:image/jpeg;base64,${imageBase64}`; // Correct format

    console.log("Image converted to base64.");

    // Send image to Crop.Health API
    console.log("Sending request to Crop.Health API...");
    const cropHealthResponse = await axios.post(
      CROP_HEALTH_API_URL,
      {
        images: [base64Image], // Send in correct format
        latitude: 0, // Optional: Update if required
        longitude: 0,
        similar_images: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Api-Key": CROP_HEALTH_API_KEY, // Correct header format
        },
      }
    );

    console.log("Crop.Health API response received:", cropHealthResponse.data);

    // Delete the uploaded file after processing
    fs.unlinkSync(imagePath);
    console.log("Temporary file deleted.");

    // Send the API response back
    res.json(cropHealthResponse.data);
  } catch (error) {
    console.error("Error processing request:", error);

    if (error.response) {
      console.error("Crop.Health API error:", error.response.data);
    } else if (error.request) {
      console.error("No response received from API:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }

    res.status(500).json({ error: "Failed to process request" });
  }
});

module.exports = router;
