"use client";

import { useEffect, useState } from "react";
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

export default function Infant() {
  const [isClient, setIsClient] = useState(false);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const textColor = darkMode ? "#fff" : "#000";

  const labels = ["1-4", "3-14", "15-18"];

  const data = {
    labels,
    datasets: [
      {
        label: "Tumores malignos",
        data: [27, 57, 85],
        backgroundColor: "#e6194b"
      },
      {
        label: "Influenza y neumonía",
        data: [24, 12, 16],
        backgroundColor: "#3cb44b"
      },
      {
        label: "Accidentes",
        data: [20, 49, 93],
        backgroundColor: "#0082c8"
      },
      {
        label: "Malformaciones congénitas",
        data: [13, 12, 19],
        backgroundColor: "#f58231"
      },
      {
        label: "Meningoencefalitis bacteriana",
        data: [6, 0, 0],
        backgroundColor: "#911eb4"
      },
      {
        label: "Enfermedades del corazón",
        data: [6, 9, 15],
        backgroundColor: "#808080"
      },
      {
        label: "Meningoencefalitis viral",
        data: [3, 0, 0],
        backgroundColor: "#46f0f0"
      },
      {
        label: "Enfermedades cerebrovasculares",
        data: [0, 7, 0],
        backgroundColor: "#2f4f4f"
      },
      {
        label: "Septicemia",
        data: [0, 6, 0],
        backgroundColor: "#aa6e28"
      },
      {
        label: "Lesiones autoinfligidas",
        data: [0, 0, 28],
        backgroundColor: "#aaffc3"
      },
      {
        label: "Agresiones",
        data: [0, 0, 23],
        backgroundColor: "#008080"
      },
      {
        label: "Otras causas",
        data: [56, 104, 191],
        backgroundColor: "#e6beff"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor
        }
      },
      title: {
        display: true,
        text: "Principales Causas de Muerte en 2023",
        color: textColor
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColor
        },
        title: {
          display: true,
          text: "Grupos de Edad",
          color: textColor
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColor
        },
        title: {
          display: true,
          text: "Número de Muertes",
          color: textColor
        }
      }
    }
  };

  return (
    <div className="w-full">
      <Bar data={data} options={options} />
    </div>
  );
}
