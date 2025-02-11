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

export default function MortalidadMaterna3({ showLegend = false }) {
  const { darkMode } = useDarkMode();

  // Etiquetas y explicaciones para el tooltip
  const labels = [
    "Embarazo Ectópico",
    "Aborto",
    "Complicaciones Puerperio",
    "Embolia Obstétrica",
    "Infecciones Puerperales",
    "Complicaciones Parto",
    "Trastornos Placentarios",
    "Otras Hemorragias",
    "Trastornos Hipertensivos",
    "Otras Complicaciones",
  ];

  const explanations = {
    "Embarazo Ectópico": "Embarazo fuera de la placenta, generalmente en las trompas de Falopio.",
    "Aborto": "Interrupción del embarazo, ya sea espontánea o inducida.",
    "Complicaciones Puerperio": "Problemas médicos tras el parto, como infecciones o hemorragias.",
    "Embolia Obstétrica": "Obstrucción de vasos sanguíneos causada por líquido amniótico o coágulos.",
    "Infecciones Puerperales": "Infecciones postparto que pueden poner en riesgo la vida de la madre.",
    "Complicaciones Parto": "Dificultades en el trabajo de parto, como desgarros o sufrimiento fetal.",
    "Trastornos Placentarios": "Anomalías en la placenta que afectan el desarrollo fetal y la madre.",
    "Otras Hemorragias": "Pérdidas de sangre graves por diversas razones obstétricas.",
    "Trastornos Hipertensivos": "Presión arterial elevada en el embarazo que puede derivar en eclampsia.",
    "Otras Complicaciones": "Condiciones variadas que impactan la salud materna durante el embarazo.",
  };

  // Datos originales
  const rawData = [2, 1, 8, 4, 3, 1, 1, 4, 4, 2];

  // Combinar etiquetas y valores para ordenarlos por valor (descendente)
  const combined = labels.map((label, index) => ({ label, value: rawData[index] }));
  combined.sort((a, b) => b.value - a.value); // Orden descendente (mayor a menor)

  // Extraer etiquetas y valores ya ordenados
  const sortedLabels = combined.map((item) => item.label);
  const sortedValues = combined.map((item) => item.value);

  // Ajuste para que las barras no lleguen al borde máximo
  const maxValue = Math.max(...sortedValues) + 1;

  // Configuración de datos para la gráfica
  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: showLegend ? "Defunciones 2023" : "",
        data: sortedValues,
        // Todas las barras en color azul
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
      legend: { display: showLegend, labels: { color: darkMode ? "white" : "black" } },
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            return explanations[tooltipItems[0].label] || tooltipItems[0].label;
          },
          label: function () {
            
            return "";
          },
        },
      },
    },
  };

  return (
    <div className="p-6 border-4 border-gray-700 dark:border-gray-300 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Causas Directas de Mortalidad Materna</h2>
      <div className="h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
