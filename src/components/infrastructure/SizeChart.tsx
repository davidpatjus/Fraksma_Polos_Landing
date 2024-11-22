const SizeChart = () => {
  return (
    <section className="my-16" id="size">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4 text-primary">
          Confianza Fraksma
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          ¿No estás seguro de tu talla? Consulta nuestra guía de tallas. Cambios
          garantizados para tu tranquilidad.
        </p>
      </div>
      <div className="relative aspect-[16/9] md:aspect-[3/1] rounded-xl overflow-hidden bg-muted shadow-2xl flex items-center justify-center">
        <img
          src="/tallasFraksma.webp"
          alt="Guía de tallas Fraksma"
          className="object-cover w-max h-max"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <button
            onClick={() => window.open("/tallasFraksma.webp", "_blank")}
            className="px-6 py-3 text-lg font-bold bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition-colors"
          >
            Ver Guía de Tallas
          </button>
        </div>
      </div>
    </section>
  );
};

export default SizeChart;
