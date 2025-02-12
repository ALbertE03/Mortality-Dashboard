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
  TooltipItem,
} from "chart.js";
import { useDarkMode } from "../components/DarkModeProvider";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MortalidadMaterna3({ showLegend = false }: { showLegend?: boolean }) {
  const { darkMode } = useDarkMode();

  // Etiquetas y explicaciones para el tooltip
  const labels: string[] = [
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

  const explanations: Record<string, string> = {
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
  const rawData: number[] = [2, 1, 8, 4, 3, 1, 1, 4, 4, 2];

  // Combinar etiquetas y valores para ordenarlos de mayor a menor
  const combined = labels.map((label, index) => ({ label, value: rawData[index] }));
  combined.sort((a, b) => b.value - a.value);

  // Extraer etiquetas y valores ordenados
  const sortedLabels: string[] = combined.map((item) => item.label);
  const sortedValues: number[] = combined.map((item) => item.value);

  // Ajuste para que las barras no lleguen al borde máximo
  const maxValue = Math.max(...sortedValues) + 1;

  // Configuración de datos para la gráfica
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

  // Opciones del gráfico tipadas de forma que se ajuste a Chart.js
  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        // Para una barra horizontal, el eje x es lineal
        type: "linear" as const,
        ticks: { color: darkMode ? "white" : "black" },
        suggestedMax: maxValue,
        title: {
          display: true,
          text: "Defunciones Totales",
          color: darkMode ? "white" : "black",
          font: { size: 14, weight: "bold" as const } as const,
        },
      },
      y: {
        // El eje y es de tipo 'category'
        type: "category" as const,
        ticks: {
          color: darkMode ? "white" : "black",
          callback: (_value: unknown, index: number): string => sortedLabels[index],
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
          title: (tooltipItems: TooltipItem<"bar">[]): string => {
            const item = tooltipItems[0];
            return explanations[item.label] || item.label;
          },
          label: (): string => "",
        },
      },
      title: {
        display: true,
        text: "Causas Directas de Mortalidad Materna",
        font: { size: 16, weight: "bold" as const } as const,
        align: "center" as const,
        color: darkMode ? "white" : "black",
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
