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

export default function ConductualChart1() {
  const { darkMode } = useDarkMode();
  const [selectedDataset, setSelectedDataset] = useState<"total" | "male" | "female">("total");

  // 🏷️ Grupos de edad (Se omiten <10 años y 10-19 años)
  const ageGroups = ["20-39", "40-59", "60-79", "80+"];

  // 🩺 Tipos de accidentes
  const causes = [
    "Caídas accidentales",
    "Secuelas de accidentes",
    "Accidentes de transporte",
    "Vehículos de motor",
    "Peatón",
    "Ahogamiento",
    "Fuego y humo",
    "Envenenamiento",
    "Exposición eléctrica",
    "Otros accidentes"
  ];

  // 🎨 Colores ajustados a la paleta dada
  const colors = [
    "#4A90E2", // Azul
    "#E94E77", // Rosa fuerte
    "#50E3C2", // Turquesa
    "#F5A623", // Naranja vibrante
    "#B8E986", // Verde claro
    "#D0021B", // Rojo oscuro
    "#9B9B9B", // Gris medio
    "#7B4173", // Púrpura oscuro
    "#F8E71C", // Amarillo fuerte
    "#BD10E0"  // Violeta intenso
  ];

  // 📊 Datos (Se omiten menores de 10 y 10-19)
  const maleData = [
    [25, 122, 429, 660],  // Caídas accidentales
    [3, 18, 110, 292],    // Secuelas de accidentes
    [209, 294, 178, 42],  // Accidentes de transporte
    [194, 262, 149, 33],  // Vehículos de motor
    [33, 67, 60, 25],     // Peatón
    [68, 70, 44, 11],     // Ahogamiento
    [3, 6, 14, 3],        // Fuego y humo
    [13, 21, 11, 3],      // Envenenamiento
    [31, 42, 16, 3],      // Exposición eléctrica
    [32, 78, 71, 25]      // Otros accidentes
  ];

  const femaleData = [
    [3, 29, 387, 1038],
    [0, 9, 162, 818],
    [44, 56, 40, 10],
    [41, 49, 37, 10],
    [7, 19, 21, 5],
    [3, 3, 3, 0],
    [1, 3, 4, 4],
    [2, 2, 5, 1],
    [4, 1, 1, 1],
    [2, 21, 27, 22]
  ];

  // Calcular total sumando ambos conjuntos de datos
  const totalData = maleData.map((row, index) =>
    row.map((value, i) => value + femaleData[index][i])
  );

  // 📌 Configuración de los datasets con diferentes colores
  const datasets = causes.map((cause, index) => ({
    label: cause,
    data:
      selectedDataset === "total"
        ? totalData[index]
        : selectedDataset === "male"
        ? maleData[index]
        : femaleData[index],
    backgroundColor: colors[index]
  }));

  // 📊 Configuración del gráfico
  const chartData = {
    labels: ageGroups,
    datasets: datasets
  };

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
    <div className="p-6">
      {/* Selector de género */}
      <div className="flex justify-center space-x-4 mb-4">
        {["total", "male", "female"].map((dataset) => (
          <button
            key={dataset}
            onClick={() => setSelectedDataset(dataset as "total" | "male" | "female")}
            className={`px-4 py-2 rounded-lg transition ${
              selectedDataset === dataset
                ? dataset === "total"
                  ? "bg-green-600 text-white" // Botón "Total" en verde cuando está activo
                  : "bg-blue-600 text-white"  // Botón "Masculino" y "Femenino" en azul cuando está activo
                : "bg-gray-300 text-gray-900 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 hover:dark:bg-gray-600"
            }`}
          >
            {dataset === "total" ? "Total" : dataset === "male" ? "Masculino" : "Femenino"}
          </button>
        ))}
      </div>

      {/* 📊 Gráfico */}
      <div className="h-96">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
