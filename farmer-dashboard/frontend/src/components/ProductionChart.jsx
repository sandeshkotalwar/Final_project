import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductionChart = ({ data }) => {
  // Define month order
  const monthOrder = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Sort data by month order
  const sortedData = [...data].sort((a, b) => {
    return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
  });

  // Create a gradient for the bars
  const getGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, "rgba(56, 161, 105, 1)"); // Dark green
    gradient.addColorStop(1, "rgba(102, 194, 164, 1)"); // Light green
    return gradient;
  };

  const chartData = {
    labels: sortedData.map((item) => item.month),
    datasets: [
      {
        label: "Production (kg)",
        data: sortedData.map((item) => item.kg),
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null; // Handle initial render
          return getGradient(ctx, chartArea);
        },
        borderRadius: 5, // Rounded corners for bars
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
      title: {
        display: true,
        text: "Monthly Production",
        color: "#333", // Dark text for title
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
        ticks: {
          color: "#555", // Dark text for x-axis labels
        },
      },
      y: {
        grid: {
          color: "#e0e0e0", // Light gray grid lines for y-axis
        },
        ticks: {
          color: "#555", // Dark text for y-axis labels
        },
      },
    },
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-green-900 mb-4">Monthly Production</h2>
      <div style={{ height: "400px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ProductionChart;