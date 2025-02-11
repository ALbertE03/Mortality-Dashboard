"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MiniMenu from "../../components/Menu";
import CerebrovascularChart from "../../components/CerebrovascularChart";
import CardiovascularChart from "../../components/CardiovascularChart";
import TumorChart from "../../components/TumorChart";
import InfectionChart from "../../components/InfectionChart"; 
import { useDarkMode } from "../../components/DarkModeProvider";

export default function EnfermedadesNoTransmisibles() {
  const { darkMode } = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState<"vasculares" | "tumores" | "infecciosas">("vasculares");

  return (
    <motion.div 
      key="enfermedades-no-transmisibles"
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className={`w-full max-w-6xl mx-auto p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Título Principal */}
      <h1 className="text-4xl font-bold text-center mb-6">Enfermedades No Transmisibles</h1>

      {/* Subrayado tipo electrocardiograma */}
      <div className="w-full h-8 flex justify-center mb-8">
        <svg viewBox="0 0 500 30" className="w-full max-w-3xl">
          <polyline
            points="0,15 30,15 40,5 50,25 60,10 70,20 80,15 500,15"
            stroke={darkMode ? "#FF0000" : "#FF0000"}
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Introducción */}
      <p className="text-lg text-center mb-8 max-w-3xl mx-auto">
        Las <strong>enfermedades no transmisibles</strong> son aquellas que no se contagian de persona a persona, pero representan una de las <strong>principales causas de mortalidad</strong> en Cuba y el mundo.  
        Estas enfermedades suelen desarrollarse de manera lenta y están influenciadas por factores como el <strong>estilo de vida</strong>, la <strong>alimentación</strong> y la <strong>genética</strong>.  
        <br /><br />
        En este análisis exploraremos tres grandes grupos de enfermedades no transmisibles:  
        <br /><br />
        - <strong>Enfermedades vasculares</strong>: incluyen las enfermedades <strong>cardiovasculares</strong> y <strong>cerebrovasculares</strong>, principales causas de infartos y derrames cerebrales.  
        - <strong>Tumores malignos</strong>: el cáncer es una de las enfermedades con mayor impacto en la mortalidad.  
        - <strong>Enfermedades infecciosas no transmisibles</strong>: afectan a largo plazo la salud de los pacientes y pueden estar vinculadas a infecciones crónicas.  
      </p>

      {/* Selector de Categoría */}
      <div className="flex justify-center mb-6 space-x-4">
        {["vasculares", "tumores", "infecciosas"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as "vasculares" | "tumores" | "infecciosas")}
            className={`px-4 py-2 rounded-lg transition ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            {category === "vasculares" ? "Enfermedades Vasculares" :
             category === "tumores" ? "Tumores" :
             "Enfermedades Infecciosas No Transmisibles"}
          </button>
        ))}
      </div>

      {/* Contenido Dinámico Basado en la Selección */}
      <div className={`p-6 border-4 border-gray-700 dark:border-gray-300 rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
        {selectedCategory === "vasculares" && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">Enfermedades Vasculares</h2>
            <p className="text-md text-center mb-6 max-w-4xl mx-auto">
              Estas enfermedades afectan la circulación sanguínea e incluyen las <strong>cardiovasculares</strong> y <strong>cerebrovasculares</strong>.  
              Son responsables de una gran proporción de fallecimientos en Cuba.  
            </p>

            {/* Gráficos de enfermedades vasculares */}
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <CerebrovascularChart />
              <CardiovascularChart />
            </div>
          </>
        )}

        {selectedCategory === "tumores" && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">Tumores Malignos</h2>
            <p className="text-md text-center mb-6 max-w-3xl mx-auto">
              El cáncer sigue siendo una de las principales causas de muerte en el país.  
              La detección temprana y la reducción de factores de riesgo pueden prevenir muchos casos.
            </p>
            <TumorChart />
          </>
        )}

        {selectedCategory === "infecciosas" && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">Enfermedades Infecciosas No Transmisibles</h2>
            <p className="text-md text-center mb-6 max-w-3xl mx-auto">
              Aunque menos conocidas, estas enfermedades pueden afectar órganos como el hígado y los pulmones a largo plazo.  
            </p>
            <InfectionChart />
          </>
        )}
      </div>

      {/* 🔹 Sección de Análisis Final */}
      <div className="mt-12 text-lg text-center max-w-4xl mx-auto p-6 border-4 border-gray-700 dark:border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Impacto en la Población Adulta</h2>
        <p>
          En Cuba, la <strong>esperanza de vida</strong> es de <strong>78 años</strong>. Sin embargo, la mayor incidencia de estas enfermedades se concentra en la franja de <strong>60-79 años</strong>,  
          lo que evidencia una pérdida de <strong>años de vida saludable</strong>.
        </p>
        <p className="mt-4">
          La <strong>prevención debe comenzar desde la adolescencia</strong>. Es en esta etapa cuando se adquieren hábitos que pueden marcar la diferencia en la calidad de vida futura.  
          El <strong>sedentarismo</strong>, la <strong>mala alimentación</strong> y el <strong>consumo de tabaco y alcohol</strong> son factores que aumentan el riesgo de desarrollar enfermedades crónicas en la adultez.
        </p>
        <p className="mt-4">
          La <strong>Organización Mundial de la Salud (OMS)</strong> recomienda <strong>mantenerse activo</strong>, <strong>llevar una dieta equilibrada</strong>, <strong>evitar el consumo de sustancias nocivas </strong>  
          y priorizar el <strong>bienestar mental</strong> para garantizar una vejez más saludable.
        </p>
        <p className="mt-4 font-semibold">
          ¡Las decisiones que tomamos hoy determinan nuestra calidad de vida en el futuro!
        </p>
      </div>

      {/* Menú flotante siempre visible */}
      <MiniMenu />
    </motion.div>
  );
}
