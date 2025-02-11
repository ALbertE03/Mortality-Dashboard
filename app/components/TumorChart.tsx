"use client";

import { useState, useMemo } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { useDarkMode } from "../components/DarkModeProvider";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const maleData: Record<string, number[]> = {
  "Tráquea, bronquios y pulmón": [0, 0, 8, 422, 1906, 609],
  "Próstata": [1, 0, 1, 127, 1688, 1661],
  "Intestino": [1, 0, 11, 188, 603, 356],
  "Laringe": [0, 0, 3, 193, 471, 150],
  "Labio, cavidad bucal y laringe": [0, 1, 6, 235, 386, 102],
  "Vías urinarias": [4, 0, 7, 58, 368, 219],
  "Esófago": [0, 0, 2, 202, 349, 87],
  "Otros tumores linfáticos y hematopoyéticos": [1, 5, 31, 133, 248, 66],
  "Estómago": [0, 0, 5, 87, 276, 96],
  "Hígado y vías biliares": [0, 0, 5, 74, 282, 81],
  "Páncreas": [0, 0, 6, 93, 247, 68],
  "Encéfalo": [5, 2, 21, 103, 152, 32],
  "Piel": [0, 1, 2, 37, 113, 133],
  "Leucemia": [19, 12, 16, 58, 131, 47],
  "Recto y ano": [0, 0, 10, 34, 110, 40],
  "Huesos y cartílagos": [2, 4, 11, 31, 78, 29],
  "Mama": [0, 0, 0, 4, 9, 4],
  "Otras localizaciones": [3, 5, 24, 173, 436, 172],
};

const femaleData: Record<string, number[]> = {
  "Tráquea, bronquios y pulmón": [0, 0, 9, 252, 1308, 452],
  "Mama": [0, 0, 45, 433, 856, 477],
  "Intestino": [0, 0, 9, 205, 718, 541],
  "Otras partes del útero y las no especificadas": [0, 0, 16, 157, 413, 151],
  "Cuello de útero": [0, 0, 26, 148, 246, 105],
  "Páncreas": [0, 0, 5, 55, 244, 116],
  "Otros tumores linfáticos y hematopoyéticos": [1, 1, 20, 98, 204, 57],
  "Hígado y vías biliares": [2, 0, 3, 64, 195, 107],
  "Ovario": [0, 2, 14, 98, 154, 58],
  "Vías urinarias": [0, 0, 4, 41, 173, 99],
  "Estómago": [0, 0, 3, 42, 152, 100],
  "Encéfalo": [3, 6, 11, 69, 134, 39],
  "Leucemia": [14, 13, 12, 47, 106, 45],
  "Recto y ano": [1, 0, 2, 50, 130, 44],
  "Labio, cavidad bucal y laringe": [1, 0, 0, 34, 93, 75],
  "Piel": [0, 0, 4, 15, 60, 97],
  "Esófago": [0, 0, 0, 25, 84, 42],
  "Laringe": [0, 0, 0, 15, 55, 28],
  "Huesos y cartílagos": [1, 5, 5, 18, 37, 22],
  "Otras localizaciones": [6, 3, 23, 147, 413, 188],
};

const allCancerKeys = Array.from(
  new Set([...Object.keys(maleData), ...Object.keys(femaleData)])
);

allCancerKeys.forEach((key) => {
  if (!maleData[key]) {
    maleData[key] = [0, 0, 0, 0, 0, 0];
  }
  if (!femaleData[key]) {
    femaleData[key] = [0, 0, 0, 0, 0, 0];
  }
});

const cancerTypes = allCancerKeys;

export default function TumorChart() {
  const { darkMode } = useDarkMode();

  // El sexo seleccionado: "total", "male" o "female"
  const [selectedSex, setSelectedSex] = useState<"total" | "male" | "female">("total");
  // Se inicializa con un cáncer seleccionado por defecto
  const [selectedCancers, setSelectedCancers] = useState<string[]>([
    "Tráquea, bronquios y pulmón",
  ]);

  const ageGroups = ["20-39", "40-59", "60-79", "80+"];
  const colors = [
    "#4A90E2",
    "#E94E77",
    "#50E3C2",
    "#F5A623",
    "#B8E986",
    "#D0021B",
    "#8B572A",
    "#BD10E0",
    "#417505",
    "#F8E71C",
    "#7ED321",
    "#B3B3B3",
    "#4A4A4A",
    "#D0011B",
    "#9B9B9B",
    "#F5A623",
    "#5A0ED2",
    "#E93E24",
    "#FF8800",
    "#00CC33",
  ];

  // Filtrar o combinar datos según el sexo seleccionado
  const filteredData = useMemo(() => {
    if (selectedSex === "male") return maleData;
    if (selectedSex === "female") return femaleData;

    const totalData: Record<string, number[]> = {};
    allCancerKeys.forEach((key) => {
      totalData[key] = maleData[key].map((val, i) => val + femaleData[key][i]);
    });
    return totalData;
  }, [selectedSex, allCancerKeys]);

  // Alternar selección de cáncer
  const toggleCancerSelection = (cancer: string) => {
    setSelectedCancers((prev) =>
      prev.includes(cancer) ? prev.filter((c) => c !== cancer) : [...prev, cancer]
    );
  };

  // Calcular el máximo del eje Y para el gráfico de barras
  const yAxisMax = useMemo(() => {
    if (selectedCancers.length === 0) return 30;
    const allValues = selectedCancers.flatMap((cancer) => {
      const dataPoints = filteredData[cancer]?.slice(2) ?? [];
      return dataPoints;
    });
    const maxVal = Math.max(...allValues);
    return maxVal + 30;
  }, [selectedCancers, filteredData]);

  // Datos para el gráfico de barras
  const barData = useMemo(() => {
    return {
      labels: ageGroups,
      datasets: selectedCancers.map((cancer, index) => ({
        label: cancer,
        data: (filteredData[cancer] || []).slice(2),
        backgroundColor: colors[index % colors.length],
      })),
    };
  }, [selectedCancers, filteredData, ageGroups, colors]);

  // Opciones para el gráfico de barras (incluyendo estilo para modo oscuro)
  const barOptions = useMemo(() => {
    return {
      scales: {
        y: {
          beginAtZero: true,
          max: yAxisMax,
          ticks: {
            color: darkMode ? "#FFFFFF" : "#000000",
          },
          grid: {
            color: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
          },
        },
        x: {
          ticks: {
            color: darkMode ? "#FFFFFF" : "#000000",
          },
          grid: {
            color: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: darkMode ? "#FFFFFF" : "#000000",
          },
        },
        tooltip: {
          titleColor: darkMode ? "#FFFFFF" : "#000000",
          bodyColor: darkMode ? "#FFFFFF" : "#000000",
          footerColor: darkMode ? "#FFFFFF" : "#000000",
        },
      },
    };
  }, [yAxisMax, darkMode]);

  // Datos para el gráfico de pastel
  const pieData = useMemo(() => {
    return {
      labels: selectedCancers,
      datasets: [
        {
          data: selectedCancers.map((cancer) => {
            const last4 = (filteredData[cancer] || []).slice(2);
            return last4.reduce((acc, val) => acc + val, 0);
          }),
          backgroundColor: selectedCancers.map(
            (_, index) => colors[index % colors.length]
          ),
        },
      ],
    };
  }, [selectedCancers, filteredData, colors]);

  // Opciones para el gráfico de pastel: en modo claro y oscuro, el tooltip tendrá letras blancas
  const pieOptions = useMemo(() => {
    return {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context: TooltipItem<"pie">) {
              const dataset = context.dataset;
              const dataIndex = context.dataIndex;
              const dataArr = dataset.data as number[];
              const total = dataArr.reduce((a, b) => a + b, 0);
              const currentValue = dataArr[dataIndex];
              const percentage = ((currentValue / total) * 100).toFixed(2) + "%";
              const labelName = context.label || "";
              return labelName + ": " + percentage;
            },
          },
          // En ambos modos, el tooltip mostrará el texto en blanco
          titleColor: "#FFFFFF",
          bodyColor: "#FFFFFF",
          footerColor: "#FFFFFF",
        },
      },
    };
  }, [darkMode, colors]);

  return (
    <div className="p-6 border-4 border-gray-700 dark:border-gray-300 rounded-lg">
      {/* Selector de Sexo */}
      <div className="flex justify-center space-x-4 mb-4">
        {(["total", "male", "female"] as const).map((sex) => (
          <button
            key={sex}
            onClick={() => setSelectedSex(sex)}
            className={`px-4 py-2 rounded-lg transition ${
              selectedSex === sex
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {sex === "total" ? "Total" : sex === "male" ? "Hombres" : "Mujeres"}
          </button>
        ))}
      </div>

      <div className="flex">
        {/* Gráfico de Barras */}
        <div className="w-3/4">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Mortalidad por Tumores Malignos
          </h2>
          <div className="h-96">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Selector de Cánceres */}
        <div
          className={`w-56 ml-8 border-2 rounded-lg p-2 overflow-y-scroll max-h-[400px] ${
            darkMode
              ? "dark:border-gray-400 dark:bg-gray-800 dark:text-white"
              : "bg-white border-gray-400 text-gray-900"
          }`}
        >
          <h3 className="text-md font-semibold text-center mb-2">Tipos de Cáncer</h3>
          <ul className="space-y-1">
            {cancerTypes.map((cancer) => (
              <li
                key={cancer}
                onClick={() => toggleCancerSelection(cancer)}
                className={`cursor-pointer p-1 text-sm rounded ${
                  selectedCancers.includes(cancer)
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-300"
                }`}
              >
                {cancer}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Gráfico de Pastel */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Distribución de Cánceres Seleccionados
        </h2>
        <div className="border-4 border-gray-700 dark:border-gray-300 rounded-lg p-6 flex justify-center items-center">
          {/* Pastel */}
          <div style={{ width: "400px", height: "400px" }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
          {/* Leyenda manual */}
          <div className="ml-8">
            {selectedCancers.map((cancer, index) => (
              <div key={cancer} className="flex items-center mb-2">
                <div
                  className="w-4 h-4 mr-2"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span>{cancer}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
