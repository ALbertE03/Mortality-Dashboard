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
  Legend
} from "chart.js";
import { useDarkMode } from "../components/DarkModeProvider";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CardiovascularChart() {
  const { darkMode } = useDarkMode();
  const [selectedDataset, setSelectedDataset] = useState<"total" | "male" | "female">("total");

 
  const ageGroups = ["20-39", "40-59", "60-79", "80+"];

  const diseases = ["Isquémicas", "Hipertensivas", "Insuficiencia cardíaca", "Arritmias", "Otras enfermedades"];

  const colors = ["#4A90E2", "#E94E77", "#50E3C2", "#F5A623", "#B8E986"];

  const maleData = [
    [56, 1186, 4969, 4160], 
    [26, 431, 1522, 1282], 
    [4, 61, 456, 503], 
    [13, 119, 311, 223], 
    [19, 139, 430, 292]
  ];

  const femaleData = [
    [24, 466, 3370, 5109], 
    [16, 272, 1166, 1665], 
    [2, 47, 378, 602], 
    [10, 50, 243, 275], 
    [8, 65, 313, 368]
  ];

  const totalData = maleData.map((disease, index) => disease.map((value, i) => value + femaleData[index][i]));

  const datasets = diseases.map((disease, index) => ({
    label: disease,
    data: selectedDataset === "total" ? totalData[index] : selectedDataset === "male" ? maleData[index] : femaleData[index],
    backgroundColor: colors[index]
  }));

  const chartData = {
    labels: ageGroups,
    datasets: datasets
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { color: darkMode ? "white" : "black" } }
    },
    scales: {
      x: { 
        title: { display: true, text: "Grupos de Edad", color: darkMode ? "white" : "black" },
        ticks: { color: darkMode ? "white" : "black" }
      },
      y: { 
        title: { display: true, text: "Defunciones", color: darkMode ? "white" : "black" }, 
        beginAtZero: true, 
        ticks: { color: darkMode ? "white" : "black" }
      }
    }
  };

  return (
    <div className="p-6 border-4 border-gray-700 dark:border-gray-300 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Mortalidad por Enfermedades Cardiovasculares</h2>

      {/* Selector de género */}
      <div className="flex justify-center space-x-4 mb-4">
        {["total", "male", "female"].map((dataset) => (
          <button
            key={dataset}
            onClick={() => setSelectedDataset(dataset as "total" | "male" | "female")}
            className={`
              px-4 py-2 rounded-lg transition 
              ${selectedDataset === dataset 
                ? dataset === "total" 
                  ? "bg-green-600 text-white"  
                  : "bg-blue-600 text-white"   
                : "bg-gray-300 text-gray-900 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 hover:dark:bg-gray-600"
              }`}
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
