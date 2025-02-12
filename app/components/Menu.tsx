"use client";

import { useState, useEffect } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "../components/DarkModeProvider";
import { usePathname, useRouter } from "next/navigation";

export default function MiniMenu() {
  const [menuOpen, setMenuOpen] = useState<boolean>(() => {
    return typeof window !== "undefined" && localStorage.getItem("menuOpen") === "true";
  });

  const { darkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();
  const pathname = usePathname(); // Obtener la ruta actual

  // Almacenar el estado del menú a través de la navegación
  useEffect(() => {
    localStorage.setItem("menuOpen", String(menuOpen));
  }, [menuOpen]);

  // Manejar navegación sin recargar la página
  const handleNavigation = (route: string) => {
    if (pathname !== route) {
      router.push(route);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Botón flotante para mostrar/ocultar el menú con aria-label para accesibilidad */}
      <button 
        aria-label="Toggle menu"
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <Menu size={28} />
      </button>

      {/* Menú visible con animaciones */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className={`absolute bottom-16 left-0 w-52 p-4 rounded-lg shadow-lg transition-all ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {/* Opciones del menú */}
            {[
              { name: "Inicio", route: "/dashboard" },
              { name: "Enfermedades No Transmisibles", route: "/dashboard/enfermedades-no-transmisibles" },
              { name: "Mortalidad Conductual", route: "/dashboard/mortalidad-conductual" },
              { name: "Mortalidad y Sexualidad", route: "/dashboard/responsabilidad-reproductiva" },
            ].map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavigation(item.route)}
                className={`block w-full text-left p-2 rounded-lg transition-all ${
                  pathname === item.route ? "bg-blue-500 text-white font-semibold" : "hover:bg-gray-700 dark:hover:bg-gray-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}

            {/* Botón para cambiar el tema */}
            <motion.button 
              onClick={toggleDarkMode} 
              className="block w-full mt-4 p-2 rounded-lg transition-all"
              style={{
                backgroundColor: darkMode ? "#FFD700" : "#333",
                color: darkMode ? "#333" : "#FFF"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {darkMode ? <Sun size={23} /> : <Moon size={23} />} {darkMode ? "Modo Claro" : "Modo Oscuro"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
