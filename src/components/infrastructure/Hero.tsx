import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden lg:py-72">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/Banner_Fraksma.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            ¡Mega Oferta de Black Friday!
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Escoge tus 3 polos favoritos por tan solo{" "}
            <span className="font-bold text-2xl text-yellow-400">$130.000</span>
          </p>
          <Button
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            onClick={() =>
              document.getElementById("product-selection")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Comprar Ahora <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
