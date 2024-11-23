import React, { useState, useEffect } from "react";
import { Clock, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const EnhancedHeader: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function calculateTimeLeft() {
    const targetDate = new Date("2024-12-01T23:59:59");
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return { days, hours, minutes, seconds };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gradient-to-r from-black to-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 gap-8">
            <img
              src="/isotipo_blanco-Fraksma.png"
              alt="FraksmaSport"
              className="h-12 w-auto"
            />
            <div className="hidden md:block">
              <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
                Black Friday Exclusivo
              </h1>
              <p className="text-sm">
                3 polos por{" "}
                <span className="font-bold text-yellow-400">$190.000 COP</span>
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-lg">
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Inicio
            </a>
            <a href="#products" className="hover:text-yellow-400 transition-colors">
              Productos
            </a>
            <a href="#size" className="hover:text-yellow-400 transition-colors">
              Tallas
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Contacto
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-yellow-500 text-white rounded-full px-4 py-2 flex items-center space-x-2">
              <span className="font-bold">! Envío Gratis !</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.div
              className="hidden md:flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Clock className="h-5 w-5 text-yellow-400" />
              <div className="text-sm font-semibold">
                {timeLeft.days > 0 ||
                timeLeft.hours > 0 ||
                timeLeft.minutes > 0 ||
                timeLeft.seconds > 0 ? (
                  <span>
                    {timeLeft.days > 0 ? `${timeLeft.days}d ` : ""}
                    {timeLeft.hours.toString().padStart(2, "0")}:
                    {timeLeft.minutes.toString().padStart(2, "0")}:
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </span>
                ) : (
                  <span className="text-red-500">¡Oferta terminada!</span>
                )}
              </div>
            </motion.div>

            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900"
          >
            <nav className="flex flex-col space-y-4 p-4">
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Inicio
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Productos
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Sobre Nosotros
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Contacto
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default EnhancedHeader;

