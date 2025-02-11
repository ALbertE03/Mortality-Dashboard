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


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MortalChart() {
  const { darkMode } = useDarkMode();

  
  const causes = [
    "Enfermedades del corazón",
    "Tumores malignos",
    "Enfermedades cerebrovasculares",
    "Influenza y neumonía",
    "Accidentes",
    "Enfermedades crónicas respiratorias",
    "Enfermedades arteriales",
    "Diabetes mellitus",
    "Cirrosis y enfermedades hepáticas",
    "Lesiones autoinfligidas",
    "Sida"
  ];

  const deaths = [32105, 25199, 11222, 9200, 5818, 3930, 2852, 2281, 1795, 1671, 294];

  
  const blueColor = "#c7441c";


  const chartData = {
    labels: causes,
    datasets: [
      {
        label: "Defunciones",
        data: deaths,
        backgroundColor: blueColor,
        borderWidth: 1,
      },
    ],
  };

  
  const chartOptions = {
    indexAxis: "y", 
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Número de Defunciones",
          color: darkMode ? "white" : "black",
        },
        ticks: { color: darkMode ? "white" : "black" },
      },
      y: {
        title: {
          display: true,
          text: "Causa de Muerte",
          color: darkMode ? "white" : "black",
        },
        ticks: { color: darkMode ? "white" : "black" },
      },
    },
  };

  return (
    <div className="h-[600px] w-full">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
