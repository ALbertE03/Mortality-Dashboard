"use client";

import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";
import { useDarkMode } from "../components/DarkModeProvider";

// Registrar Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CerebrovascularChart() {
  const { darkMode } = useDarkMode();
  const [selectedDataset, setSelectedDataset] = useState<"total" | "male" | "female">("total");

  // 🔹 Rango de edad (sin "<20 años")
  const ageGroups = ["20-39", "40-59", "60-79", "80+"];

  const diseases = ["ECV", "Oclusivas", "Hemorrágicas", "Otras formas", "Secuelas"];

  const colors = ["#4A90E2", "#E94E77", "#50E3C2", "#F5A623", "#B8E986"];

  const maleData = [
    [53, 687, 2737, 2245], 
    [9, 163, 917, 856], 
    [39, 363, 745, 383], 
    [3, 105, 545, 478], 
    [2, 56, 530, 528]
  ];

  const femaleData = [
    [35, 367, 2158, 2920], 
    [1, 88, 715, 1045], 
    [27, 207, 672, 475], 
    [4, 50, 439, 720], 
    [3, 22, 332, 680]
  ];

  const totalData = maleData.map((disease, index) =>
    disease.map((value, i) => value + femaleData[index][i])
  );

  const datasets = diseases.map((disease, index) => ({
    label: disease,
    data:
      selectedDataset === "total"
        ? totalData[index]
        : selectedDataset === "male"
        ? maleData[index]
        : femaleData[index],
    backgroundColor: colors[index]
  }));

  const chartData = { labels: ageGroups, datasets: datasets };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: darkMode ? "white" : "black" }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Grupos de Edad",
          color: darkMode ? "white" : "black"
        },
        ticks: { color: darkMode ? "white" : "black" }
      },
      y: {
        title: {
          display: true,
          text: "Defunciones",
          color: darkMode ? "white" : "black"
        },
        beginAtZero: true,
        ticks: { color: darkMode ? "white" : "black" }
      }
    }
  };

  return (
    <div className="p-6 border-4 border-gray-700 dark:border-gray-300 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Mortalidad por Enfermedades Cerebrovasculares
      </h2>

      {/* Selector de género */}
      <div className="flex justify-center space-x-4 mb-4">
        {["total", "male", "female"].map((dataset) => (
          <button
            key={dataset}
            onClick={() => setSelectedDataset(dataset as "total" | "male" | "female")}
            className={`
              px-4 py-2 rounded-lg transition 
              ${
                selectedDataset === dataset
                  ? dataset === "total"
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-900 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 hover:dark:bg-gray-600"
              }
            `}
          >
            {dataset === "total" ? "Total" : dataset === "male" ? "Hombres" : "Mujeres"}
          </button>
        ))}
      </div>

      {/* Gráfico */}
      <div className="h-96">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
