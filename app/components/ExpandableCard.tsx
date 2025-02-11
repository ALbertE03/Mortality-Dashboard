"use client";

import { useState, useEffect } from "react";
import { MoveDiagonal, ChevronUp, Users, HeartPulse, Skull } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "../components/DarkModeProvider";

interface ExpandableCardProps {
  title: string;
  value: number;
  details: string[];
}

export default function ExpandableCard({ title, value, details }: ExpandableCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = value / (duration / 16);
    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [value]);

 
  const formattedTitle = title.trim().toLowerCase();

  
  const getIcon = () => (
    <span className={`${darkMode ? "text-white" : "text-black"}`}>
      {formattedTitle.includes("población joven") && <Users size={40} />}
      {formattedTitle.includes("esperanza de vida") && <HeartPulse size={40} />}
      {formattedTitle.includes("defunciones") && <Skull size={40} />}
    </span>
  );

  return (
    <motion.div
      className={`relative p-8 w-full md:w-1/3 text-center transition-all 
      ${darkMode ? "#0a192f text-white" : "bg-white text-black"}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {}
      <button
        className={`absolute top-4 right-4 p-2 rounded-full transition-all 
        ${darkMode ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-200"}`}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <ChevronUp size={23} /> : <MoveDiagonal size={23} />}
      </button>

      {}
      <div className="mt-10 flex flex-col items-center">
        {getIcon()}
        <p className="text-6xl font-bold mb-4">{displayValue.toLocaleString()}</p>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      {}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className={`mt-4 text-lg overflow-hidden`}
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: "300px" }} 
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {details.map((detail, index) => (
              <p key={index} className="py-1">{detail}</p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
