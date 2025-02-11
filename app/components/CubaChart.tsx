"use client";

import { useEffect, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { GeoJsonObject, Feature } from "geojson";
import type { Layer } from "leaflet";

// Define la interfaz para las propiedades del feature
interface ProvinceProperties {
  province: string;
}

// 🚗 Datos de accidentes por provincia en 2023
const accidentData: Record<string, { Total: number }> = {
  "Pinar del Rio": { Total: 31 },
  Artemisa: { Total: 58 },
  "La Habana": { Total: 178 },
  Mayabeque: { Total: 27 },
  Matanzas: { Total: 79 },
  "Villa Clara": { Total: 62 },
  Cienfuegos: { Total: 33 },
  "Sancti Spiritus": { Total: 37 },
  "Ciego de Avila": { Total: 34 },
  Camaguey: { Total: 51 },
  "Las Tunas": { Total: 34 },
  Holguin: { Total: 68 },
  Granma: { Total: 49 },
  "Santiago de Cuba": { Total: 70 },
  Guantanamo: { Total: 41 },
  "Isla de la Juventud": { Total: 6 },
};

// 🎨 Función para asignar color según el número de accidentes
const getColorScale = (value: number) => {
  const minValue = Math.min(...Object.values(accidentData).map((d) => d.Total));
  const maxValue = Math.max(...Object.values(accidentData).map((d) => d.Total));
  const scale = (value - minValue) / (maxValue - minValue);
  return interpolateColor("#FFFFFF", "#FF0000", scale);
};

// 🎨 Función de interpolación de color (gradiente blanco → rojo)
const interpolateColor = (
  minColor: string,
  maxColor: string,
  factor: number
) => {
  const hexToRgb = (hex: string) =>
    hex.replace(/^#/, "").match(/.{1,2}/g)!.map((x) => parseInt(x, 16));

  const rgbToHex = (r: number, g: number, b: number) =>
    `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase()}`;

  const minRGB = hexToRgb(minColor);
  const maxRGB = hexToRgb(maxColor);
  const resultRGB = minRGB.map((min, i) =>
    Math.round(min + (maxRGB[i] - min) * factor)
  );
  return rgbToHex(resultRGB[0], resultRGB[1], resultRGB[2]);
};

// 🚗 Mortalidad histórica por provincia (2005-2022)
const accidentHistory = {
  "Pinar del Rio": [47, 51, 45, 48, 32, 51, 23, 31, 29, 29, 35, 36, 38, 26, 28, 17, 22, 34],
  Artemisa: [null, null, null, null, null, null, 25, 36, 36, 20, 55, 158, 40, 40, 36, 27, 27, 43],
  "La Habana": [70, 60, 65, 57, 65, 63, 145, 152, 121, 160, 152, 39, 116, 123, 102, 76, 80, 115],
  Mayabeque: [null, null, null, null, null, null, 41, 32, 38, 33, 43, 38, 43, 34, 36, 37, 48, 46],
  Matanzas: [67, 77, 49, 55, 49, 56, 71, 55, 64, 57, 58, 46, 64, 46, 49, 34, 53, 68],
  "Villa Clara": [63, 84, 66, 53, 50, 51, 58, 57, 50, 60, 44, 63, 58, 60, 48, 39, 46, 46],
  Cienfuegos: [45, 48, 28, 22, 34, 27, 20, 31, 34, 46, 27, 32, 27, 28, 41, 31, 26, 42],
  "Sancti Spiritus": [52, 15, 41, 28, 40, 26, 20, 25, 17, 25, 21, 26, 30, 28, 14, 16, 30, 19],
  "Ciego de Avila": [39, 29, 32, 45, 54, 33, 26, 38, 24, 22, 42, 34, 45, 30, 23, 11, 21, 41],
  Camaguey: [54, 47, 57, 77, 49, 45, 56, 45, 50, 63, 83, 55, 57, 64, 50, 61, 57, 57],
  "Las Tunas": [36, 46, 22, 25, 28, 37, 26, 17, 25, 32, 31, 28, 24, 29, 32, 18, 24, 18],
  Holguin: [78, 75, 58, 60, 75, 66, 53, 69, 67, 77, 58, 55, 81, 60, 47, 28, 63, 61],
  Granma: [63, 45, 62, 39, 37, 36, 35, 55, 43, 35, 39, 41, 35, 39, 30, 16, 33, 36],
  "Santiago de Cuba": [69, 63, 52, 56, 47, 52, 51, 49, 61, 68, 80, 82, 68, 53, 45, 45, 46, 48],
  Guantanamo: [22, 22, 30, 37, 30, 15, 29, 14, 23, 17, 18, 32, 21, 22, 23, 15, 13, 31],
  "Isla de la Juventud": [6, 4, 1, 5, 4, 4, 3, 2, 5, 2, 2, 2, 3, 1, 2, 4, 1, 0],
};

// Colores para las provincias en el gráfico
const provinceColors = [
  "#FF0000",
  "#0000FF",
  "#00FF00",
  "#FFA500",
  "#800080",
  "#008080",
  "#FFC0CB",
  "#FFD700",
  "#A52A2A",
  "#00FFFF",
  "#7CFC00",
  "#DC143C",
];

// Años de los datos
const years = Array.from({ length: 18 }, (_, i) => 2005 + i);

// Definición de tipo para los puntos del gráfico
interface ChartDataPoint {
  year: number;
  [province: string]: number;
}

export default function CubaChart() {
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);

  useEffect(() => {
    fetch("/cuba-with-provinces_1078.geojson")
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  const toggleProvinceSelection = (province: string) => {
    setSelectedProvinces((prev) =>
      prev.includes(province)
        ? prev.filter((p) => p !== province)
        : [...prev, province]
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      {geoData ? (
        <MapContainer
          bounds={[[23.4, -85.3], [19.7, -74.3]]}
          style={{
            height: "400px",
            width: "100%",
            backgroundColor: "turquoise",
          }}
          dragging={false}
          zoomControl={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          touchZoom={false}
          keyboard={false}
          attributionControl={false}
        >
          <GeoJSON
            data={geoData}
            style={(feature: Feature<ProvinceProperties>) => {
              const province = feature.properties.province
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
              return {
                fillColor: getColorScale(accidentData[province]?.Total || 0),
                weight: 1,
                opacity: 1,
                color: "#333",
                fillOpacity: 0.9,
              };
            }}
            onEachFeature={(
              feature: Feature<ProvinceProperties>,
              layer: Layer
            ) => {
              const province = feature.properties.province
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

              layer.bindTooltip(
                `
                  <div style="text-align: center;">
                    <strong>${province}</strong><br/>
                    <span style="color: red;">Accidentes Totales 2023: ${
                      accidentData[province]?.Total || 0
                    }</span>
                  </div>
                `,
                { sticky: true }
              );

              layer.on("click", () => {
                toggleProvinceSelection(province);
              });
            }}
          />
        </MapContainer>
      ) : (
        <p className="text-center">Cargando mapa...</p>
      )}

      {selectedProvinces.length > 0 && (
        <div className="w-full mt-8">
          <h2 className="text-center text-lg font-bold">
            Mortalidad (2005-2022)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={years.map((year, i) => {
                const dataPoint: ChartDataPoint = { year };
                selectedProvinces.forEach((province) => {
                  dataPoint[province] =
                    accidentHistory[province]?.[i] ?? 0;
                });
                return dataPoint;
              })}
            >
              <XAxis dataKey="year" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              {selectedProvinces.map((province, index) => (
                <Line
                  key={province}
                  type="monotone"
                  dataKey={province}
                  stroke={
                    provinceColors[index % provinceColors.length]
                  }
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
