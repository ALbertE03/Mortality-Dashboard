"use client";

import { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from "chart.js";
import { useDarkMode } from "../components/DarkModeProvider";

// Registrar Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

export default function ConductualChart() {
  const { darkMode } = useDarkMode();

  // 🔹Seleccionar al menos una categoría por defecto
  const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>([
    "No respetar el derecho de vía" // <-- Comportamiento inicial seleccionado
  ]);

  // 🔹 Años en el eje X
  const years = Array.from({ length: 14 }, (_, i) => 2009 + i);

  // 🔹 Categorías de comportamiento
  const behaviorCategories = [
    "No respetar el derecho de vía", "No atender el control del vehículo", "Exceso de velocidad",
    "No obedecer las luces del semáforo", "Violaciones del peatón", "Conducir bajo la ingestión de bebidas alcohólicas",
    "Adelantamiento indebido", "Maniobra de marcha atrás", "Estacionamiento inadecuado",
    "Violaciones de los conductores de ciclos", "Animales sueltos", "Desperfectos técnicos",
    "Conductores que violan derecho del peatón", "Transportación masiva", "Otros"
  ];

  // 🔹 Colores para cada categoría
  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFC300", "#900C3F",
    "#DAF7A6", "#581845", "#28B463", "#1F618D", "#6C3483", "#D68910",
    "#17A589", "#A93226", "#2E4053"
  ];

  // 🔹 Datos de comportamiento por año (porcentaje)
  const behaviorData: Record<string, number[]> = {
    "No respetar el derecho de vía": [25.3, 25.4, 25.0, 25.1, 25.4, 25.2, 26.0, 21.6, 16.7, 16.7, 16.7, 15.9, 26.5, 29.4],
    "No atender el control del vehículo": [29.4, 28.4, 29.5, 29.5, 29.7, 31.6, 30.2, 33.2, 34.3, 33.2, 34.1, 34.1, 36.4, 30.1],
    "Exceso de velocidad": [6.8, 8.0, 6.9, 7.1, 6.4, 5.8, 6.9, 6.8, 6.5, 6.8, 6.5, 6.8, 6.9, 8.7],
    "No obedecer las luces del semáforo": [1.8, 1.6, 2.4, 2.4, 2.3, 2.2, 2.1, 2.3, 2.1, 2.2, 2.2, 2.2, 2.0, 1.8],
    "Violaciones del peatón": [7.4, 7.8, 4.4, 2.4, 2.3, 2.1, 1.6, 1.9, 1.4, 1.4, 1.1, 1.0, 4.2, 5.0],
    "Conducir bajo la ingestión de bebidas alcohólicas": [2.8, 2.5, 1.8, 1.5, 1.6, 1.3, 1.5, 1.5, 1.3, 1.4, 1.7, 1.8, 1.3, 1.7],
    "Adelantamiento indebido": [5.3, 5.3, 6.3, 6.0, 5.5, 5.4, 5.2, 4.8, 5.1, 5.5, 5.3, 5.3, 5.4, 5.8],
    "Maniobra de marcha atrás": [3.7, 3.5, 2.8, 2.5, 2.6, 2.7, 2.5, 2.1, 2.3, 2.0, 2.4, 2.3, 2.1, 1.9],
    "Estacionamiento inadecuado": [0.6, 0.4, 0.0, 0.4, 0.3, 0.3, 0.5, 0.3, 0.2, 0.3, 0.2, 0.2, 0.3, 0.3],
    "Violaciones de los conductores de ciclos": [1.1, 1.3, 1.0, 0.8, 0.6, 0.6, 0.6, 0.5, 0.4, 0.4, 0.3, 0.4, 0.5, 0.2],
    "Animales sueltos": [1.5, 1.6, 1.8, 1.9, 2.0, 2.1, 2.6, 2.8, 3.3, 3.3, 3.7, 4.2, 3.6, 3.1],
    "Desperfectos técnicos": [5.2, 5.3, 5.5, 6.2, 6.0, 5.9, 5.7, 4.8, 4.5, 3.8, 3.8, 3.9, 5.9, 6.5],
    "Conductores que violan derecho del peatón": [0.2, 0.1, 0.3, 0.2, 0.2, 0.1, 0.1, 0.2, 0.2, 0.1, 0.1, 0.1, 0.2, 0.1],
    "Transportación masiva": [0.3, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.2, 0.2, 0.0, 0.0, 0.1, 0.2, 0.3],
    "Otros": [8.6, 8.4, 11.6, 13.7, 14.9, 14.2, 14.3, 17.0, 21.5, 22.8, 21.8, 21.8, 4.6, 5.3]
  };

  // 🔹 Alternar selección de comportamiento
  const toggleBehaviorSelection = (behavior: string) => {
    setSelectedBehaviors((prevSelected) =>
      prevSelected.includes(behavior)
        ? prevSelected.filter((b) => b !== behavior)
        : [...prevSelected, behavior]
    );
  };

  // 🔹 Obtener datos del gráfico de pastel con porcentajes
  const pieDataValues = selectedBehaviors.map(
    behavior => behaviorData[behavior]?.reduce((acc, val) => acc + val, 0) || 0
  );

  const total = pieDataValues.reduce((acc, val) => acc + val, 0);

  const pieData: ChartData<"pie"> = {
    labels: selectedBehaviors,
    datasets: [
      {
        data: pieDataValues,
        backgroundColor: selectedBehaviors.map(
          (_, index) => colors[index % colors.length]
        ),
      },
    ],
  };

  // 🔹 Configuración del tooltip para mostrar el porcentaje
  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(2) + "%";
            return `${percentage}`;
          },
        },
      },
      legend: {
        display: false, // Ocultar la leyenda dentro del gráfico de pastel
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* 📌 Gráfico de líneas y selector de categorías */}
      <div className="w-full flex flex-row justify-between items-start">
        
        {/* 📊 Gráfico de Líneas */}
        <div className="w-3/4 p-6 border-4 border-gray-700 dark:border-gray-300 rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Evolución de Causas de Accidentes
          </h2>
          <div className="h-96">
            <Line
              data={{
                labels: years,
                datasets: selectedBehaviors.map((behavior, index) => ({
                  label: behavior,
                  data: behaviorData[behavior] || [],
                  borderColor: colors[index % colors.length],
                  backgroundColor: colors[index % colors.length],
                  fill: false,
                }))
              }}
              options={{ plugins: { legend: { display: false } } }}
            />
          </div>
        </div>

        {/* 📌 Selector de categorías */}
        <div className="w-64 border-2 rounded-lg p-2 overflow-y-scroll max-h-[400px] ml-6">
          <h3 className="text-md font-semibold text-center mb-2">Causas de Accidentes</h3>
          <ul className="space-y-1">
            {behaviorCategories.map((behavior) => (
              <li
                key={behavior}
                onClick={() => toggleBehaviorSelection(behavior)}
                className={`cursor-pointer p-1 text-sm rounded ${
                  selectedBehaviors.includes(behavior)
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-300"
                }`}
              >
                {behavior}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 📊 Gráfico de Pastel dentro de su propio cuadro */}
      <div className="mt-6 w-full flex flex-row justify-center items-start">
        
        {/* 📊 Cuadro del Gráfico de Pastel */}
        <div className="w-1/2 p-6 border-4 border-gray-700 dark:border-gray-300 rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Distribución de Causas Seleccionadas
          </h2>
          <Pie data={pieData} options={pieOptions} />
        </div>

        {/* 📌 Leyenda afuera del cuadro */}
        <div className="w-64 ml-6">
          <ul className="space-y-1">
            {selectedBehaviors.map((behavior, index) => (
              <li key={behavior} className="text-sm flex items-center space-x-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span>{behavior}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
