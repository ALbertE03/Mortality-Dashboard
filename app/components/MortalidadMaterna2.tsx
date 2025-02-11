"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDarkMode } from "../components/DarkModeProvider";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MortalidadMaterna2() {
  const { darkMode } = useDarkMode();

  const data = {
    labels: ["Defunciones Directas", "Defunciones Indirectas", "Otras Causas"],
    datasets: [
      {
        label: "Defunciones 2023",
        data: [23, 12, 7],
        backgroundColor: ["red", "blue", "gray"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: darkMode ? "white" : "black" } },
      y: { ticks: { color: darkMode ? "white" : "black" } },
    },
    plugins: { legend: { labels: { color: darkMode ? "white" : "black" } } },
  };

  return (
    <div className="p-6 border-4 border-gray-700 dark:border-gray-300 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Causas de Mortalidad Materna (2023)</h2>
      <div className="h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
