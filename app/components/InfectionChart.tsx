"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { useDarkMode } from "../components/DarkModeProvider";

// Registrar Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function InfectionChart() {
  const { darkMode } = useDarkMode();
  const [selectedDataset, setSelectedDataset] = useState<"defunciones" | "porcentaje">("defunciones");

  // Datos de enfermedades infecciosas no transmisibles a lo largo del tiempo
  const years = [
    1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2006, 2007, 2008, 2009, 2010,
    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023
  ];

  const defunciones = [
    3886, 1576, 986, 1144, 1021, 1486, 745, 889, 812, 793, 766, 749, 895,
    873, 988, 1128, 1202, 1072, 1088, 1063, 1084, 1091, 1048, 1228, 1281, 1036
  ];

  const porcentaje = [
    7.2, 3.1, 1.8, 1.8, 1.4, 1.9, 1.0, 1.0, 1.0, 1.0, 0.9, 0.9, 1.0,
    1.0, 1.1, 1.2, 1.2, 1.1, 1.1, 1.0, 1.0, 1.0, 0.9, 0.7, 1.1, 0.9
  ];

  const datasets = {
    defunciones: {
      label: "Defunciones Totales",
      data: defunciones,
      borderColor: "#4A90E2",
      backgroundColor: "rgba(74, 144, 226, 0.2)"
    },
    porcentaje: {
      label: "Por ciento respecto a Total de Muertes en el País",
      data: porcentaje,
      borderColor: "#50E3C2",
      backgroundColor: "rgba(80, 227, 194, 0.2)"
    }
  };

  const chartData = {
    labels: years,
    datasets: [datasets[selectedDataset]]
  };

  // 🔹 Opciones del gráfico
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "bottom", labels: { color: darkMode ? "white" : "black" } }
    },
    scales: {
      x: { 
        title: { display: true, text: "Año", color: darkMode ? "white" : "black" },
        ticks: { color: darkMode ? "white" : "black" }
      },
      y: { 
        title: { 
          display: true, 
          text: selectedDataset === "defunciones" ? "Defunciones Totales" :
                "Por ciento respecto a Total de Muertes en el País",
          color: darkMode ? "white" : "black"
        }, 
        beginAtZero: true, 
        ticks: { color: darkMode ? "white" : "black" }
      }
    }
  };

  return (
    <div className="p-6 border-4 border-gray-700 dark:border-gray-300 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Mortalidad por Enfermedades Infecciosas No Transmisibles</h2>

      {/* Selector de variable */}
      <div className="flex justify-center space-x-4 mb-4">
        {["defunciones", "porcentaje"].map((dataset) => (
          <button
            key={dataset}
            onClick={() => setSelectedDataset(dataset as "defunciones" | "porcentaje")}
            className={`
              px-4 py-2 rounded-lg transition 
              ${selectedDataset === dataset ? "bg-blue-600 text-white" 
                : "bg-gray-300 text-gray-900 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 hover:dark:bg-gray-600"}
            `}
          >
            {dataset === "defunciones" ? "Defunciones Totales" : "Por ciento respecto a Total de Muertes en el País"}
          </button>
        ))}
      </div>

      {/* Gráfico */}
      <div className="h-96">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
