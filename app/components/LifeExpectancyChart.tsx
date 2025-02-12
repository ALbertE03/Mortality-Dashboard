"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Papa from "papaparse";
import { useDarkMode } from "../components/DarkModeProvider";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title
} from "chart.js";

// Registrar componentes de Chart.js
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

export default function LifeExpectancyChart() {
  const { darkMode } = useDarkMode(); 
  const [csvData, setCsvData] = useState<Record<string, Record<string, number>> | null>(null);
  const [survivalWomenData, setSurvivalWomenData] = useState<Record<string, Record<string, number>> | null>(null);
  const [survivalMenData, setSurvivalMenData] = useState<Record<string, Record<string, number>> | null>(null);
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["Cuba"]);
  const [selectedSurvivalType, setSelectedSurvivalType] = useState<"Total" | "Hombres" | "Mujeres">("Total");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const files = [
        { url: "/data/esperanza-vida.csv", setter: setCsvData },
        { url: "/data/supervivencia-65-mujeres.csv", setter: setSurvivalWomenData },
        { url: "/data/supervivencia-65-hombres.csv", setter: setSurvivalMenData }
      ];

      // Set para acumular todos los países de los distintos archivos
      const combinedCountries = new Set<string>();

      try {
        for (const file of files) {
          const response = await fetch(file.url);
          if (!response.ok) throw new Error(`Error al cargar ${file.url}`);

          const text = await response.text();
          Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
              const rawData = result.data as Record<string, string>[];

              // Se usa const porque no se reasigna la variable
              const structuredData: Record<string, Record<string, number>> = {};

              rawData.forEach((row) => {
                const country = row["Country Name"];
                if (!country) return;

                // Se usa const ya que no se reasigna, solo se agregan propiedades
                const countryData: Record<string, number> = {};
                let nullCount = 0;

                Object.keys(row).forEach((year) => {
                  if (!isNaN(Number(year))) {
                    const value = row[year] ? parseFloat(row[year]) : NaN;
                    countryData[year] = value;
                    if (isNaN(value)) nullCount++;
                  }
                });

                // Solo añadimos países con datos mayormente completos
                if (nullCount <= 5) {
                  structuredData[country] = countryData;
                  combinedCountries.add(country); 
                }
              });

              // Asignar los datos parseados a su setter correspondiente
              file.setter(structuredData);
            },
          });
        }

        // Convertir el set en array y ordenar alfabéticamente.
        setAvailableCountries(Array.from(combinedCountries).sort());
        setLoading(false);
      } catch (error) {
        console.error("Error cargando archivos CSV:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function toggleCountry(country: string) {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  }

  if (loading)
    return <p className="text-center text-gray-500">Cargando datos...</p>;
  if (!csvData || !csvData["Cuba"])
    return <p className="text-center text-red-500">No se encontraron datos.</p>;

  const years = Object.keys(csvData["Cuba"]).sort();

  const generateChartData = (
    dataset: Record<string, Record<string, number>> | null
  ) => ({
    labels: years,
    datasets: selectedCountries.map((country, index) => ({
      label: country,
      data: dataset?.[country]
        ? years.map((year) => dataset[country][year] ?? null)
        : [],
      borderColor: `hsl(${index * 100}, 70%, 50%)`,
      borderWidth: 2,
      fill: false,
      pointRadius: 3,
    })),
  });

  const generateSurvivalData = () => {
    let dataset: Record<string, Record<string, number>> = {};
    if (selectedSurvivalType === "Hombres" && survivalMenData) {
      dataset = survivalMenData;
    } else if (selectedSurvivalType === "Mujeres" && survivalWomenData) {
      dataset = survivalWomenData;
    } else if (
      selectedSurvivalType === "Total" &&
      survivalMenData &&
      survivalWomenData
    ) {
      for (const country of selectedCountries) {
        dataset[country] = {};
        for (const year of years) {
          const men = survivalMenData[country]?.[year] ?? NaN;
          const women = survivalWomenData[country]?.[year] ?? NaN;
          dataset[country][year] =
            isNaN(men) || isNaN(women) ? NaN : (men + women) / 2;
        }
      }
    }
    return generateChartData(dataset);
  };

  // Opciones del gráfico
  const chartOptions = (title: string) => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Años",
          font: { size: 14, weight: "bold" } as const,
          color: darkMode ? "#FFFFFF" : "#000000",
        },
        ticks: {
          color: darkMode ? "#FFFFFF" : "#000000",
          font: { size: 12 } as const,
          rotation: 0,
          align: "center" as const,
        },
        grid: { display: false },
      },
      y: {
        title: {
          display: true,
          text: title,
          font: { size: 14, weight: "bold" } as const,
          color: darkMode ? "#FFFFFF" : "#000000",
        },
        beginAtZero: false,
        grid: {
          display: true,
          color: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
        },
        ticks: { color: darkMode ? "#FFFFFF" : "#000000" },
      },
    },
    plugins: {
      legend: { labels: { color: darkMode ? "#FFFFFF" : "#000000" } },
      title: {
        display: true,
        text: title,
        font: { size: 16, weight: "bold" } as const,
        align: "center" as const,
        color: darkMode ? "#FFFFFF" : "#000000",
      },
    },
  });

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 flex flex-row gap-6">
      {/* Contenedor de gráficos y controles */}
      <div className="flex-1 flex flex-col gap-8">
        {/* Selector para el tipo de Supervivencia */}
        <div className="mb-4">
          <label className="mr-2 font-bold" htmlFor="survival-type">
            Tipo de Supervivencia:
          </label>
          <select
            id="survival-type"
            aria-label="Tipo de Supervivencia"
            value={selectedSurvivalType}
            onChange={(e) =>
              setSelectedSurvivalType(
                e.target.value as "Total" | "Hombres" | "Mujeres"
              )
            }
            className="p-1 border rounded"
          >
            <option value="Total">Total</option>
            <option value="Hombres">Hombres</option>
            <option value="Mujeres">Mujeres</option>
          </select>
        </div>

        {/* Gráfico de Esperanza de Vida */}
        <div
          className="p-4 relative border rounded-lg shadow-lg"
          style={{ height: "400px" }}
        >
          <Line
            data={generateChartData(csvData)}
            options={chartOptions("Esperanza de Vida al Nacer")}
          />
        </div>

        {/* Gráfico de Supervivencia */}
        <div
          className="p-4 relative border rounded-lg shadow-lg"
          style={{ height: "400px" }}
        >
          <Line
            data={generateSurvivalData()}
            options={chartOptions("Supervivencia hasta los 65 años (%)")}
          />
        </div>
      </div>

      {/* Selector de países a la derecha */}
      <div className="w-48 border-2 border-gray-500 dark:border-gray-400 rounded-lg p-2 overflow-y-scroll max-h-[800px]">
        <h3 className="text-md font-semibold text-center mb-2">Países</h3>
        <ul className="space-y-1">
          {availableCountries.map((country) => (
            <li
              key={country}
              onClick={() => toggleCountry(country)}
              className={`cursor-pointer p-1 text-sm rounded ${
                selectedCountries.includes(country)
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-300"
              }`}
            >
              {country}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
