"use client";

import { useEffect, useState } from "react";
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


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ETSChart() {
  const { darkMode } = useDarkMode();
  const [isClient, setIsClient] = useState(false);

  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; 

  
  const etsdData = [
    { year: 1970, sífilis: 619, blenorragia: 238, condiloma: 60 },
    { year: 1980, sífilis: 4346, blenorragia: 16471, condiloma: 1427 },
    { year: 1990, sífilis: 9205, blenorragia: 35722, condiloma: 2845 },
    { year: 2000, sífilis: 9199, blenorragia: 19067, condiloma: 4758 },
    { year: 2010, sífilis: 1445, blenorragia: 4210, condiloma: 3977 },
    { year: 2020, sífilis: 4520, blenorragia: 2770, condiloma: 0 },
    { year: 2021, sífilis: 3793, blenorragia: 1770, condiloma: 0 },
    { year: 2022, sífilis: 7428, blenorragia: 1823, condiloma: 0 },
    { year: 2023, sífilis: 8298, blenorragia: 1629, condiloma: 0 }
  ];

  
  const sidaData = [
    { year: 2010, cases: 764 },
    { year: 2022, cases: 394 },
    { year: 2023, cases: 319 }
  ];

  
  const labels = etsdData.map(d => d.year);

  const data = {
    labels,
    datasets: [
      {
        label: "Sífilis",
        data: etsdData.map(d => d.sífilis),
        borderColor: "#E94E77",
        backgroundColor: "rgba(233, 78, 119, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        fill: false
      },
      {
        label: "Blenorragia",
        data: etsdData.map(d => d.blenorragia),
        borderColor: "#4A90E2",
        backgroundColor: "rgba(74, 144, 226, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        fill: false
      },
      {
        label: "Condiloma",
        data: etsdData.map(d => d.condiloma),
        borderColor: "#F5A623",
        backgroundColor: "rgba(245, 166, 35, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        fill: false
      },
      {
        label: "SIDA",
        data: sidaData.map(d => ({ x: d.year, y: d.cases })),
        borderColor: "#50E3C2",
        backgroundColor: "#50E3C2",
        pointRadius: 6,
        pointHoverRadius: 8,
        pointStyle: "circle",
        type: "scatter"
      }
    ]
  };

  
  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Incidencia de ETS (1970-2023)"
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Año"
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Casos reportados"
        }
      }
    }
  };

  return (
    <div className={`w-full p-6 border-4 border-gray-700 dark:border-gray-300 rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h2 className="text-2xl font-semibold text-center mb-4">Incidencia de ETS en el Tiempo</h2>

      {}
      <div className="w-full h-[500px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
