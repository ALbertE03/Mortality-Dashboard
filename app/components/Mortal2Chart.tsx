"use client";

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

// Registrar Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Mortal2Chart() {
  const { darkMode } = useDarkMode();

  // 🔹 Datos de Años de Vida Potencial Perdidos (AVPP) en 2023
  const categories = [
    "Enfermedades del corazón",
    "Tumores malignos",
    "Enfermedades cerebrovasculares",
    "Influenza y neumonía",
    "Accidentes",
    "Enfermedades crónicas vías respiratorias",
    "Enfermedades arteriales",
    "Diabetes mellitus",
    "Cirrosis y enfermedades hepáticas",
    "Lesiones autoinfligidas"
  ];

  const totalData = [14.5, 19.4, 4.9, 3.8, 5.5, 1.7, 0.7, 1.7, 2.3, 3.2];

  // 🔹 Ordenar los datos de mayor a menor
  const sortedData = categories
    .map((category, index) => ({ category, value: totalData[index] }))
    .sort((a, b) => b.value - a.value); // Orden descendente

  const sortedCategories = sortedData.map(item => item.category);
  const sortedValues = sortedData.map(item => item.value);

  const chartData = {
    labels: sortedCategories,
    datasets: [
      {
        label: "Años de Vida Perdidos",
        data: sortedValues,
        backgroundColor: "#c7441c" // 🔹 Todas las barras en azul
      }
    ]
  };

  // 🔹 Opciones del gráfico
  const chartOptions = {
    indexAxis: "y" as const, // 🔹 Barras horizontales
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        title: { display: true, text: "Años de Vida Perdidos", color: darkMode ? "white" : "black" },
        ticks: { color: darkMode ? "white" : "black" }
      },
      y: {
        ticks: { color: darkMode ? "white" : "black" }
      }
    }
  };

  return (
    <div className="w-full h-[550px]"> {/* 🔹 Ajuste de altura para igualar MortalChart */}
      {/* 📊 Gráfico con mayor altura */}
      <div className="h-full">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
