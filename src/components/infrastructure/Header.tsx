import { Clock } from "lucide-react";

const Header = () => {
  return (
		<header className="bg-black text-white sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <img 
            src="/isotipo_blanco-Fraksma.png" 
            alt="FraksmaSport" 
            className="h-10 w-auto"
        />
        <div className="hidden md:block text-center">
            <h1 className="text-2xl font-extrabold">
            Black Friday Exclusivo
            </h1>
            <p className="text-sm">
            3 polos por <span className="text-yellow-400">$130.000 COP</span>
            </p>
        </div>
        <div className="flex items-center space-x-1 md:space-x-2">
            <Clock className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-semibold">Oferta por tiempo limitado</span>
        </div>
        </div>
    </header>
	) 
  
}

export default Header;