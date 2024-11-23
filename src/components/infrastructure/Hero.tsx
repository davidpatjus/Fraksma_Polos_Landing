import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from 'framer-motion';

const EnhancedHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
  }, [controls]);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section className="relative py-20 overflow-hidden lg:py-32">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/polosConjunto.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10"></div>
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className="lg:w-1/2 mb-10 lg:mb-0"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
              ¡Mega Oferta de <span className="text-yellow-400">Black Friday!</span>
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Escoge tus 3 polos favoritos por tan solo{" "}
              <span className="font-bold text-3xl text-yellow-400">$190.000</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition-all duration-300 transform hover:scale-105"
                onClick={() =>
                  document.getElementById("product-selection")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Comprar Ahora <ArrowRight className="ml-2" />
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="icon"
                  className="bg-white/20 hover:bg-white/40 text-white rounded-full w-16 h-16 flex items-center justify-center backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
                  onClick={handlePlayVideo}
                >
                  <Play className="w-8 h-8" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
};

export default EnhancedHero;

