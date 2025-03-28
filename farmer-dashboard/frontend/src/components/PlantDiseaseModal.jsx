import { useState } from "react";
import axios from "axios";

const PlantDiseaseModal = ({ isOpen, onClose }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/plant/identify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Extract plant name and diseases from the response
      const cropSuggestions = response.data.result.crop.suggestions;
      const diseaseSuggestions = response.data.result.disease.suggestions;

      if (cropSuggestions.length > 0 && diseaseSuggestions.length > 0) {
        const plantName = cropSuggestions[0].name; // Get the most likely plant name
        const diseases = diseaseSuggestions.map((disease) => ({
          name: disease.name,
          probability: (disease.probability * 100).toFixed(2), // Convert probability to percentage
        }));

        setResult({
          plantName,
          diseases,
        });
      } else {
        setError("No plant or disease detected.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to process the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className="bg-gradient-to-br from-gray-200 to-white p-6 rounded-lg shadow-lg w-96 max-w-full mx-4"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-green-800">
              Detect Plant Diseases
            </h2>
            <button
              onClick={onClose}
              className="text-green-800 hover:text-green-600"
            >
              &times;
            </button>
          </div>

          {/* Image Preview */}
          {previewImage && (
            <div className="mb-4">
              <img
                src={previewImage}
                alt="Uploaded Plant"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          {/* File Input */}
          <div className="flex flex-col items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-green-300 p-2 rounded-lg w-full bg-white"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-lg w-full hover:from-green-600 hover:to-green-800 disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Upload & Detect"}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
          )}

          {/* Result Display */}
          {result && (
            <div className="mt-4">
              <h3 className="font-semibold text-green-800">
                Detected Plant:{" "}
                <span className="font-normal">{result.plantName || "Unknown"}</span>
              </h3>
              <ul className="mt-2 space-y-2">
                {result.diseases.map((disease, index) => (
                  <li
                    key={index}
                    className="bg-red-50 p-2 rounded-lg text-red-700 font-medium"
                  >
                    {disease.name} ({disease.probability}%)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default PlantDiseaseModal;