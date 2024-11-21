import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const Header = () => {
  // Estado para manejar el tiempo restante
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Función para calcular el tiempo restante
  function calculateTimeLeft() {
    const targetDate = new Date("2024-12-01T23:59:59"); 
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference > 0) {
			const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
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

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <img
          src="/isotipo_blanco-Fraksma.png"
          alt="FraksmaSport"
          className="h-10 w-auto"
        />
        <div className="hidden md:block text-center">
          <h1 className="text-2xl font-extrabold">Black Friday Exclusivo</h1>
          <p className="text-sm">
            3 polos por <span className="text-yellow-400">$130.000 COP</span>
          </p>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Clock className="h-5 w-5 text-yellow-400" />
          <div className="text-sm font-semibold">
            {timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
              <span>
                {timeLeft.days > 0 ? `${timeLeft.days} días ` : ""}
                {timeLeft.hours.toString().padStart(2, "0")}:
                {timeLeft.minutes.toString().padStart(2, "0")}:
                {timeLeft.seconds.toString().padStart(2, "0")} restantes
              </span>
            ) : (
              <span className="text-red-500">¡Oferta terminada!</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
