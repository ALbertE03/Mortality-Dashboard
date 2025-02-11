"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { useDarkMode } from "../components/DarkModeProvider";

// Registrar los componentes de Chart.js
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

export default function MortalidadMaterna1() {
  const { darkMode } = useDarkMode();
  const [activeCategories, setActiveCategories] = useState({
    directa: true,
    indirecta: true,
    total: true,
  });

  // Datos de mortalidad materna (1987 - 2023)
  const years = [
    1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005,
    2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023
  ];

  const directDeaths = [
    61, 49, 54, 59, 63, 52, 41, 63, 48, 34, 33, 41, 46, 47, 41, 43, 48, 27, 43, 42, 25, 36, 39, 38, 42, 27, 27, 26, 29,
    32, 25, 32, 26, 35, 45, 26, 23
  ];

  const indirectDeaths = [
    27, 24, 16, 19, 17, 19, 15, 21, 22, 17, 26, 18, 20, 11, 6, 15, 6, 22, 19, 13, 10, 21, 22, 17, 12, 15, 22, 17, 23,
    17, 20, 19, 15, 7, 130, 13, 12
  ];

  const totalDeaths = [
    88, 73, 70, 78, 80, 71, 56, 84, 70, 51, 59, 59, 66, 58, 47, 58, 54, 49, 62, 55, 35, 57, 61, 55, 54, 42, 49, 43, 52,
    49, 45, 51, 41, 42, 175, 39, 35
  ];

  const categories = {
    directa: { label: "Defunciones Directas", data: directDeaths, borderColor: "#FF6384" },
    indirecta: { label: "Defunciones Indirectas", data: indirectDeaths, borderColor: "#36A2EB" },
    total: { label: "Defunciones Totales", data: totalDeaths, borderColor: "#FFCE56" }
  };

  const getChartData = () => {
    return {
      labels: years,
      datasets: Object.entries(categories)
        .filter(([key]) => activeCategories[key as keyof typeof activeCategories])
        .map(([key, value]) => ({
          label: value.label,
          data: value.data,
          borderColor: value.borderColor,
          backgroundColor: `${value.borderColor}33`,
          borderWidth: 2,
          fill: false,
          pointRadius: 3,
        }))
    };
  };

  const toggleCategory = (category: "directa" | "indirecta" | "total") => {
    setActiveCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { title: { display: true, text: "Defunciones" } }
    },
    plugins: {
      legend: { position: "top" as const },
    },
  };

  return (
    <div className={`p-6 border-4 rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-white border-gray-300" : "bg-gray-50 text-gray-900 border-gray-700"}`}>

      {/* Botones para activar/desactivar categorías */}
      <div className="flex justify-center mb-6 space-x-4">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category as "directa" | "indirecta" | "total")}
            className={`px-4 py-2 rounded-lg transition ${
              activeCategories[category as "directa" | "indirecta" | "total"]
                ? "bg-blue-600 text-white"
                : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            {category === "directa" ? "Directas" : category === "indirecta" ? "Indirectas" : "Totales"}
          </button>
        ))}
      </div>

      <div className="h-96">
        <Line data={getChartData()} options={chartOptions} />
      </div>
    </div>
  );
}
