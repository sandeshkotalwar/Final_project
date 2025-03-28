import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const StoragePieChart = ({ storage }) => {
  // Calculate total percentage
  const totalPercentage = storage.reduce((sum, item) => sum + Number(item.percentage), 0);

  // Show error message if total is not 100%
  const errorMessage = totalPercentage !== 100 ? `Total percentage must be 100%. Current total: ${totalPercentage}%` : null;

  // Green gradient colors for pie chart slices
  const greenGradients = [
    "rgba(56, 161, 105, 0.8)", // Dark green
    "rgba(102, 194, 164, 0.8)", // Light green
    "rgba(144, 238, 144, 0.8)", // Lighter green
    "rgba(152, 251, 152, 0.8)", // Very light green
    "rgba(0, 128, 0, 0.8)", // Forest green
  ];

  const chartData = {
    labels: storage.map((item) => item.crop),
    datasets: [
      {
        label: "Storage (%)",
        data: storage.map((item) => item.percentage),
        backgroundColor: greenGradients,
        borderWidth: 0, // Remove border
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333", // Dark text for legend
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`,
        },
      },
    },
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-green-900 mb-4">Crop Storage</h2>
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-2 rounded-lg mb-4 text-center">
          {errorMessage}
        </div>
      )}
      <div className="flex justify-center">
        <div style={{ width: "300px", height: "350px" }}>
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default StoragePieChart;