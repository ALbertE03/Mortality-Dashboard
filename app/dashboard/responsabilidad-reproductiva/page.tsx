"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import MiniMenu from "../../components/Menu";
import { useDarkMode } from "../../components/DarkModeProvider";
import MortalidadMaterna1 from "../../components/MortalidadMaterna1";
import MortalidadMaterna3 from "../../components/MortalidadMaterna3";
import MortalidadMaterna4 from "../../components/MortalidadMaterna4";

const ETSChart = dynamic(() => import("../../components/ETSChart"), { ssr: false });
const Infant = dynamic(() => import("../../components/Infant"), { ssr: false });

export default function MortalidadReproductiva() {
  const { darkMode } = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState<"maternidad" | "ets" | "mortalidad-infantil">("maternidad");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <motion.div 
      key="mortalidad-reproductiva"
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className={`w-full max-w-6xl mx-auto p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      <h1 className="text-4xl font-bold text-center mb-6">Mortalidad y Sexualidad</h1>

      {/* Subrayado tipo electrocardiograma */}
      <div className="w-full h-8 flex justify-center mb-8">
        <svg viewBox="0 0 500 30" className="w-full max-w-3xl">
          <polyline
            points="0,15 30,15 40,5 50,25 60,10 70,20 80,15 500,15"
            stroke="#FF0000"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <p className="text-lg text-center mb-8 max-w-3xl mx-auto">
        La <strong>mortalidad reproductiva</strong> abarca todas las causas de muerte asociadas al proceso de reproducción humana,  
        desde la gestación hasta los primeros años de vida del bebé. Estas muertes pueden prevenirse con acceso a   
        <strong> atención médica adecuada</strong>, <strong>educación sexual</strong> y <strong>políticas de salud efectivas</strong>.  
        <br /><br />
        En este análisis exploraremos tres áreas críticas de la mortalidad reproductiva:  
        <br /><br />
        - <strong>Mortalidad Materna</strong>: complicaciones durante el embarazo, parto y postparto.  
        - <strong>Enfermedades de Transmisión Sexual (ETS)</strong>: impacto en la salud reproductiva y el riesgo de muerte.  
        - <strong>Mortalidad Infantil</strong>: principales causas de fallecimiento en los primeros años de vida.  
      </p>

      <div className="flex justify-center mb-6 space-x-4">
        {["maternidad", "ets", "mortalidad-infantil"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as "maternidad" | "ets" | "mortalidad-infantil")}
            className={`px-4 py-2 rounded-lg transition ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            {category === "maternidad" ? "Mortalidad Materna" :
             category === "ets" ? "Enfermedades de Transmisión Sexual" :
             "Mortalidad Infantil"}
          </button>
        ))}
      </div>

      <div className={`p-6 border-4 border-gray-700 dark:border-gray-300 rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
        {/* SECCIÓN: MORTALIDAD MATERNA */}
        {selectedCategory === "maternidad" && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">Mortalidad Materna</h2>
            <p className="text-md text-center mb-6 max-w-3xl mx-auto">
              La mortalidad materna se refiere a las muertes ocurridas durante el embarazo,  
              el parto y el postparto debido a complicaciones médicas.  
              A pesar de los avances en la atención médica, sigue siendo un problema en muchas regiones.  
              La atención prenatal, el acceso a servicios de emergencia obstétrica y la educación materna  
              son clave para reducir estos índices.  
            </p>
            <MortalidadMaterna1 />
            <div className="mt-10 text-lg text-center max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Causas de Mortalidad Materna</h2>
              <p className="mb-4">
                La <strong>mortalidad materna</strong> puede clasificarse en <strong>causas directas</strong> e <strong>indirectas</strong>:
              </p>
              <p className="mb-2">
                <strong>Causas Directas:</strong> Son aquellas relacionadas directamente con complicaciones del embarazo, parto y postparto, como hemorragias, infecciones o hipertensión.
              </p>
              <p>
                <strong>Causas Indirectas:</strong> Son aquellas que no están directamente causadas por el embarazo, pero se ven agravadas por él, como enfermedades cardiovasculares, infecciones o anemia.
              </p>
            </div>
            <div className="mt-10 flex flex-col md:flex-row justify-center gap-8">
              <div className="w-full md:w-1/2">
                <MortalidadMaterna3 />
              </div>
              <div className="w-full md:w-1/2">
                <MortalidadMaterna4 />
              </div>
            </div>
            <div className="mt-10 p-6 border-4 border-red-600 bg-red-100 dark:bg-red-800 dark:border-red-400 text-red-900 dark:text-red-100 rounded-lg shadow-lg max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-center mb-3">⚠ Peligros de la Maternidad Temprana según la OMS</h3>
              <p>
                La <strong>maternidad temprana</strong>, especialmente en adolescentes menores de 18 años, representa un grave riesgo para la salud materna e infantil. Según la <strong>Organización Mundial de la Salud (OMS)</strong>, las complicaciones del embarazo y parto son la principal causa de muerte en adolescentes en muchas partes del mundo.
              </p>
              <ul className="mt-3 list-disc pl-6">
                <li>Mayor riesgo de <strong>preeclampsia</strong> e <strong>hipertensión gestacional</strong>.</li>
                <li>Alta incidencia de <strong>partos prematuros</strong> y <strong>bebés con bajo peso al nacer</strong>.</li>
                <li>Mayor vulnerabilidad a <strong>complicaciones postparto</strong> como hemorragias e infecciones.</li>
                <li>Impacto en la <strong>salud mental</strong> y bienestar socioeconómico de las madres jóvenes.</li>
              </ul>
            </div>
          </>
        )}

        {/* SECCIÓN: ETS */}
        {selectedCategory === "ets" && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">Enfermedades de Transmisión Sexual (ETS)</h2>
            <p className="text-md text-center mb-6 max-w-3xl mx-auto">
              Las <strong>Enfermedades de Transmisión Sexual (ETS)</strong> son infecciones que se propagan principalmente  
              a través del contacto sexual sin protección. Estas enfermedades pueden ser causadas por bacterias, virus,  
              hongos o parásitos, y afectan tanto a hombres como a mujeres en todas las edades y regiones del mundo.  
              <br /><br />
              Aunque muchas ETS pueden tratarse, algunas infecciones como el <strong>VIH/SIDA</strong> no tienen cura  
              y requieren un manejo de por vida. La detección temprana, el acceso a tratamientos efectivos y el uso  
              de métodos de prevención como el <strong>preservativo</strong> y la <strong>vacunación</strong>  
              contra el VPH y la hepatitis B son fundamentales para reducir su impacto en la salud pública.  
            </p>
            <div className="w-full">
              <ETSChart />
            </div>
            <div className="mt-10 p-6 border-4 border-blue-600 bg-blue-100 dark:bg-blue-300 dark:border-blue-400 text-black dark:text-black rounded-lg shadow-lg max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-center mb-3">🔹 Recomendaciones de la OMS sobre Salud Sexual</h3>
              <p>
                La <strong>Organización Mundial de la Salud (OMS)</strong> recomienda una educación sexual integral  
                y el acceso universal a métodos de prevención para garantizar una vida saludable y libre de enfermedades.
              </p>
              <ul className="mt-3 list-disc pl-6">
                <li>Uso de <strong>preservativos</strong> en todas las relaciones sexuales para prevenir ETS.</li>
                <li>Vacunación contra el <strong>VPH</strong> y la <strong>Hepatitis B</strong> desde la adolescencia.</li>
                <li>Realizar pruebas de ETS de manera periódica para la detección y tratamiento oportuno.</li>
                <li>Acceso a <strong>tratamientos antirretrovirales</strong> en personas con VIH/SIDA.</li>
                <li>Promoción de la <strong>educación sexual en jóvenes</strong> para reducir embarazos no deseados e infecciones.</li>
              </ul>
            </div>
          </>
        )}

        {/* SECCIÓN: MORTALIDAD INFANTIL */}
        {selectedCategory === "mortalidad-infantil" && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">Mortalidad Infantil</h2>
            <p className="text-md text-center mb-6 max-w-3xl mx-auto">
              La <strong>mortalidad infantil</strong> abarca las defunciones de niños y niñas desde el primer año de vida hasta la adolescencia, y se ve influida por diversos factores:  
              <br /><br />
              - <strong>Atención prenatal</strong> y cuidado neonatal.  
              - <strong>Condiciones socioeconómicas</strong> y acceso a la salud.  
              - <strong>Nutrición</strong>, <strong>vacunación</strong> y prevención de enfermedades.  
              <br /><br />
              A pesar de los avances en medicina y salud pública, continúa siendo un problema en múltiples regiones del mundo. Mejorar la atención especializada, promover la lactancia materna y garantizar el acceso a vacunas son acciones clave para reducir estos índices.
            </p>
            <div className="w-full">
              <Infant />
            </div>
            <div className="mt-10 p-6 border-4 border-green-600 bg-green-100 dark:bg-green-800 dark:border-green-400 text-green-900 dark:text-green-100 rounded-lg shadow-lg max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-center mb-3">⚠ Importancia de la Prevención y la Madurez según la OMS</h3>
              <p>
                En las edades infantiles y adolescentes, los <strong>accidentes</strong> y los problemas de <strong>salud mental</strong> pueden convertirse en factores determinantes de la mortalidad. La <strong>madurez</strong> de padres, cuidadores y comunidades juega un papel esencial para garantizar una crianza segura y responsable.
              </p>
              <ul className="mt-3 list-disc pl-6">
                <li>Crear entornos libres de riesgos, supervisando actividades y minimizando accidentes.</li>
                <li>Atender la salud mental de niños y adolescentes, fomentando espacios de diálogo y apoyo.</li>
                <li>Según la <strong>OMS</strong>, una crianza basada en la educación, la comunicación y la estabilidad emocional reduce notablemente la mortalidad en edades tempranas.</li>
              </ul>
            </div>
          </>
        )}
      </div>

      <MiniMenu />
    </motion.div>
  );
}
