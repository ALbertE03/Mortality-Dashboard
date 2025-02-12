"use client";

import { motion } from "framer-motion";
import ConductualChart1 from "../../components/ConductualChart1";
import CubaChart from "../../components/CubaChart"; 
import ConductualChart from "../../components/ConductualChart"; 
import MiniMenu from "../../components/Menu";

export default function MortalidadConductual() {
  return (
    <motion.div
      key="mortalidad-conductual"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen flex flex-col items-center pb-12"
    >
      <h1 className="text-4xl font-bold mt-6 md:mt-12 mb-8 text-center">
        Mortalidad Conductual
      </h1>

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
        Los <strong>accidentes</strong> representan una parte significativa de la{" "}
        <strong>mortalidad evitable</strong> en Cuba. Factores como la{" "}
        <strong>distracción al conducir</strong>, el <strong>consumo de alcohol</strong>{" "}
        y el <strong>uso inadecuado de medidas de seguridad</strong> contribuyen a una alta
        tasa de fallecimientos en las vías y otros entornos.
        <br /><br />
        Analizaremos la distribución de los <strong>accidentes fatales</strong> según{" "}
        <strong>grupo de edad y género</strong>, con el fin de comprender qué poblaciones están
        en mayor riesgo y cómo pueden <strong>evitarse</strong> estos sucesos trágicos.
      </p>

      <div className="border-4 border-gray-700 dark:border-gray-300 rounded-lg px-6 py-6 w-full max-w-5xl shadow-lg mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Accidentes Mortales por Grupo de Edad
        </h2>
        <ConductualChart1 />
      </div>

      <p className="text-lg text-center mt-10 max-w-3xl mx-auto">
        Los datos reflejan una tendencia alarmante en la que los <strong>jóvenes</strong> y{" "}
        <strong>adultos en edad productiva</strong> son los más afectados por los accidentes de
        tránsito. Esto resalta la <strong>importancia de respetar las normas de tránsito</strong>,
        evitar el consumo de alcohol al volante y promover una conducción responsable.
      </p>

      <div className="border-4 border-gray-700 dark:border-gray-300 rounded-lg px-8 py-8 w-full max-w-6xl shadow-lg mt-10 transition-all duration-300 flex flex-col items-center min-h-[500px]">
        <h2 className="text-4xl font-semibold text-center mb-6">
          Accidentes de Tránsito por Provincia
        </h2>
        <h1 className="text-xl font-semibold text-center mb-6">
          ¡Seleccione una Provincia para Explorarla!
        </h1>
        <div className="w-full flex flex-col items-center justify-start">
          <div className="w-full min-h-[450px] flex justify-center items-center">
            <CubaChart />
          </div>
        </div>
      </div>

      <p className="text-lg text-center mt-10 max-w-3xl mx-auto">
        La mayoría de los accidentes fatales son causados por{" "}
        <strong>acciones individuales y la falta de responsabilidad vial</strong>. Factores como el{" "}
        <strong>exceso de velocidad</strong>, el <strong>consumo de alcohol</strong>, la{" "}
        <strong>distracción al volante</strong> y el <strong>irrespeto a las señales</strong> siguen
        siendo las principales causas de mortalidad en las carreteras.
      </p>

      <div className="border-4 border-gray-700 dark:border-gray-300 rounded-lg px-8 py-8 w-full max-w-6xl shadow-lg mt-10 transition-all duration-300 flex flex-col items-center">
        <h2 className="text-4xl font-semibold text-center mb-6">
          Factores de Comportamiento en Accidentes
        </h2>
        <div className="w-full flex justify-center">
          <ConductualChart />
        </div>
      </div>

      <MiniMenu />
    </motion.div>
  );
}
