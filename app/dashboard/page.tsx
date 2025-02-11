"use client";

import { motion } from "framer-motion";
import ExpandableCard from "../components/ExpandableCard";
import { useDarkMode } from "../components/DarkModeProvider";
import LifeExpectancyChart from "../components/LifeExpectancyChart";
import MiniMenu from "../components/Menu";
import MortalChart from "../components/MortalChart";
import Mortal2Chart from "../components/Mortal2Chart";

export default function Dashboard() {
  return (
    <motion.div
      key="inicio"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen flex flex-col items-center pb-12"
    >
      {}
      <h1 className="text-4xl font-bold mt-6 md:mt-12 mb-8 text-center">
        "SALUD EN CUBA, PARA ADOLESCENTES"
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
      <h1 className="text-3xl font-bold mt-6 md:mt-12 mb-8 text-center">
      ¿Cómo pueden mis decisiones impactar mi salud en la adultez?
      </h1>
      <p className="text-lg text-center mt-8 max-w-4xl px-6">
        Es una pregunta que todos hemos de hacernos antes de tomar actitudes que puedan ser consideradas de riesgo. En <strong>Cuba</strong>,
        aunque la protección a adolescentes y jóvenes es un tema central de discusión social, la <strong>responsabilidad individual </strong>
        sigue siendo el factor más importate para lograr llegar a la adultez con una buena salud. En este <strong>dashboard</strong>, podrás explorar, con un enfoque estadístico, como
        ese aspecto impacta las tasas de mortalidad en nuestro país.
      </p>
      <br></br>
      {/*  Cuadro con estadísticas principales */}
      <div className="border-4 border-gray-700 dark:border-gray-300 rounded-lg px-6 py-6 w-full max-w-5xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">¿Cómo estamos?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 px-4 md:px-8">
          <ExpandableCard title="Población Joven" value={1800000} details={["15-19 años: 280,000", "20-24 años: 440,000", "25-29 años: 551,000", "30-34 años: 688,000"]} />
          <ExpandableCard title="Esperanza de Vida" value={78.1} details={["Tasa de Mortalidad", "0-14 años: 0.3‰", "15-29 años: 0.7‰", "30-44 años: 1.5‰", "45-59 años: 5.3‰", "60-64 años: 8.5‰", "65+ años: 65.0‰"]} />
          <ExpandableCard title="Defunciones 2023" value={117746} details={["0-14 años: 796", "15-29 años: 199", "30-44 años: 688", "45-59 años: 17,987", "60-64 años: 12,542", "65+ años: 84,534"]} />
        </div>
      </div>

      {/*  Texto introductorio */}
      <p className="text-lg text-center mt-8 max-w-3xl px-6">
        En Cuba, la esperanza de vida al nacer es de <strong>78.1 años</strong>. Sin embargo, alcanzar los <strong>65 años</strong> con buena calidad de vida sigue siendo un reto.  
        En comparación con el resto del mundo, Cuba muestra una <strong>supervivencia hasta los 65 años</strong> más alta que el promedio global, pero aún por debajo de algunos países desarrollados.  
        <br /><br />
        Dentro de la región del <strong>Caribe</strong>, la isla mantiene una posición destacada, superando a muchas naciones vecinas en términos de longevidad saludable.  
        <strong className="text-blue-600 dark:text-blue-400"> ¡Explora y Descúbrelo tú mismo!</strong>
      </p>

      {/* Rectángulo de solo borde alrededor del selector y gráficos */}
      <div className="border-4 border-gray-700 dark:border-gray-300 rounded-lg px-6 py-6 w-full max-w-5xl shadow-lg mt-10">
        <LifeExpectancyChart />
      </div>

      {/*  Nueva Explicación antes del gráfico de Mortalidad */}
      <p className="text-lg text-center mt-12 max-w-4xl px-6">
        Las <strong>enfermedades crónicas y los accidentes</strong> representan las principales causas de fallecimientos en Cuba.  
        Entre ellas, destacan las <strong>enfermedades del corazón, los tumores malignos y los accidentes cerebrovasculares</strong>.  
        Aunque muchas de estas afecciones están relacionadas con el envejecimiento, también pueden verse influenciadas  
        por factores <strong>modificables</strong> como la alimentación, el ejercicio y el acceso a la atención médica.  
      </p>

      {/*  Sección con dos gráficos lado a lado */}
      <div className="flex flex-col md:flex-row justify-center gap-8 mt-10 w-full max-w-6xl">
        {/* Gráfico de MortalChart */}
        <div className="border-4 border-gray-700 dark:border-gray-300 rounded-lg px-6 py-6 w-full md:w-1/2 shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Principales Causas de Muerte</h2>
          <MortalChart />
        </div>

        {/*  Gráfico de Mortal2Chart */}
        <div className="border-4 border-gray-700 dark:border-gray-300 rounded-lg px-6 py-6 w-full md:w-1/2 shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Años de Vida Perdidos</h2>
          <Mortal2Chart />
        </div>
      </div>

      {/*  Resumen final */}
      <p className="text-lg text-center mt-10 max-w-3xl px-6 pb-16">
        Las decisiones que tomamos en nuestra juventud tienen un impacto directo en nuestra salud a lo largo de la vida.  
        Los hábitos que adoptamos desde temprana edad pueden <strong>mitigar riesgos</strong> y aumentar las probabilidades de alcanzar la <strong>esperanza de vida</strong> con una buena calidad de vida.  
        Sin embargo, cuando estos hábitos son perjudiciales, no solo incrementan la <strong>mortalidad juvenil</strong>, sino que también pueden condicionar una adultez marcada por enfermedades crónicas y limitaciones físicas.  
        <br /><br />
        <strong className="text-blue-600 dark:text-blue-400">
          Presiona el botón del menú
        </strong> para navegar entre las distintas secciones y descubrir cómo ciertos hábitos dañinos afectan la esperanza de vida y la calidad de la salud en la adultez,  
        así como qué acciones puedes tomar para mejorar tu bienestar a futuro.
      </p>

      {/*  Menú flotante */}
      <MiniMenu />
    </motion.div>
  );
}
