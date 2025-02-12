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
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import { useDarkMode } from "../components/DarkModeProvider";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MortalidadMaterna4({ showLegend = false }: { showLegend?: boolean }) {
  const { darkMode } = useDarkMode();

  // Etiquetas y explicaciones para el tooltip
  const labels: string[] = [
    "Enfermedades Cardiovasculares",
    "Anemia",
    "Enfermedades Infecciosas",
    "Enfermedades Respiratorias",
    "Otras Enfermedades",
  ];

  const explanations: Record<string, string> = {
    "Enfermedades Cardiovasculares": "Trastornos del corazón y los vasos sanguíneos, como ataques cardíacos.",
    "Anemia": "Deficiencia de glóbulos rojos o hemoglobina, reduciendo el oxígeno en la sangre.",
    "Enfermedades Infecciosas": "Infecciones crónicas que pueden afectar el sistema inmunológico y órganos vitales.",
    "Enfermedades Respiratorias": "Afecciones en los pulmones como neumonía, bronquitis o insuficiencia respiratoria.",
    "Otras Enfermedades": "Condiciones médicas variadas que afectan la salud materna de manera indirecta.",
  };

  // Datos originales
  const rawData: number[] = [4, 1, 2, 3, 1];

  // Combinar etiquetas y valores para ordenarlos por valor (descendente)
  const combined = labels.map((label, i) => ({ label, value: rawData[i] }));
  combined.sort((a, b) => b.value - a.value);

  // Extraer etiquetas y valores ya ordenados
  const sortedLabels: string[] = combined.map((item) => item.label);
  const sortedValues: number[] = combined.map((item) => item.value);

  // Ajuste para evitar que las barras lleguen al final exacto
  const maxValue = Math.max(...sortedValues) + 1;

  // Configuración de la data para la gráfica
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

  // Opciones del gráfico tipificadas como ChartOptions<"bar">
  const options: ChartOptions<"bar"> = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear" as const,
        ticks: { color: darkMode ? "white" : "black" },
        suggestedMax: maxValue,
        title: {
          display: true,
          text: "Defunciones Totales",
          color: darkMode ? "white" : "black",
          font: { size: 14 } as const,
        },
      },
      y: {
        type: "category" as const,
        ticks: {
          color: darkMode ? "white" : "black",
          callback: function (tickValue: string | number, index: number): string {
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
          title: function (tooltipItems: TooltipItem<"bar">[]): string {
            const label = tooltipItems[0].label as string;
            return explanations[label] || label;
          },
          label: function (): string {
            // No mostramos ningún valor en el tooltip (solo la explicación en el título)
            return "";
          },
        },
      },
      title: {
        display: true,
        text: "Causas Indirectas de Mortalidad Materna",
        font: { size: 16, weight: "bold" as const } as const,
        align: "center" as const,
        color: darkMode ? "white" : "black",
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
