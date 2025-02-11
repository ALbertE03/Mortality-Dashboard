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

export default function MortalidadMaterna4({ showLegend = false }) {
  const { darkMode } = useDarkMode();

  // Etiquetas y explicaciones para el tooltip
  const labels = [
    "Enfermedades Cardiovasculares",
    "Anemia",
    "Enfermedades Infecciosas",
    "Enfermedades Respiratorias",
    "Otras Enfermedades",
  ];

  const explanations = {
    "Enfermedades Cardiovasculares": "Trastornos del corazón y los vasos sanguíneos, como ataques cardíacos.",
    "Anemia": "Deficiencia de glóbulos rojos o hemoglobina, reduciendo el oxígeno en la sangre.",
    "Enfermedades Infecciosas": "Infecciones crónicas que pueden afectar el sistema inmunológico y órganos vitales.",
    "Enfermedades Respiratorias": "Afecciones en los pulmones como neumonía, bronquitis o insuficiencia respiratoria.",
    "Otras Enfermedades": "Condiciones médicas variadas que afectan la salud materna de manera indirecta.",
  };

  // Datos originales
  const rawData = [4, 1, 2, 3, 1];

  // Combinar etiquetas y valores para ordenarlos por valor (descendente)
  const combined = labels.map((label, i) => ({ label, value: rawData[i] }));
  combined.sort((a, b) => b.value - a.value);

  // Extraer etiquetas y valores ya ordenados
  const sortedLabels = combined.map(item => item.label);
  const sortedValues = combined.map(item => item.value);

  // Ajuste para evitar que las barras lleguen al final exacto
  const maxValue = Math.max(...sortedValues) + 1;

  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: showLegend ? "Defunciones 2023" : "",
        data: sortedValues,
       
        backgroundColor: "#c7441c",
      },
    ],
  };

  const options = {
    indexAxis: "y", 
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: darkMode ? "white" : "black" },
        suggestedMax: maxValue,
        title: {
          display: true,
          text: "Defunciones Totales",
          color: darkMode ? "white" : "black",
          font: { size: 14 },
        },
      },
      y: {
        ticks: {
          color: darkMode ? "white" : "black",
          callback: function (value, index) {
            
            return sortedLabels[index];
          },
        },
      },
    },
    plugins: {
      legend: {
        display: showLegend,
        labels: { color: darkMode ? "white" : "black" },
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            return explanations[tooltipItems[0].label] || tooltipItems[0].label;
          },
          label: function () {
            // Evita mostrar el valor en el tooltip (solo la explicación)
            return "";
          },
        },
      },
    },
  };

  return (
    <div className="p-6 border-4 border-gray-700 dark:border-gray-300 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Causas Indirectas de Mortalidad Materna
      </h2>
      <div className="h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
