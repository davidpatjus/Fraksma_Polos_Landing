import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag, RefreshCcw  } from "lucide-react";
import { productsData, FormData, SelectedProduct } from "./lib/productsData";
import Header from "./components/infrastructure/Header";
import Hero from "./components/infrastructure/Hero";
import Footer from "./components/infrastructure/Footer";
import SizeChart from "./components/infrastructure/SizeChart";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(productsData[0]);
  const [selectedColor, setSelectedColor] = useState<string>(
    "Selecciona"
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    "Selecciona"
  );
  const [formData, setFormData] = useState<FormData>({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    setCanProceed(selectedProducts.length === 3);
  }, [selectedProducts]);

  useEffect(() => {
    setSelectedColor("Selecciona");
    setSelectedSize("Selecciona");
  }, [currentProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleAddProduct = () => {
    if ( selectedColor === "Selecciona" || selectedSize === "Selecciona") {
      toast.error("Por favor selecciona un color y una talla.", {
        position: "bottom-center",
        autoClose: 3000,
      });
      return;
    }
  
    if (selectedProducts.length >= 3) {
      toast.warning("Ya has alcanzado el límite de 3 productos.", {
        position: "bottom-center",
        autoClose: 3000,
      });
      return;
    }

    const newProduct: SelectedProduct = {
      ...currentProduct,
      size: selectedSize,
      color: selectedColor,
    };
  
    setSelectedProducts((prev) => [...prev, newProduct]);
    setSelectedColor("Selecciona");
    setSelectedSize("Selecciona");
  
    toast.success("Producto añadido al combo!", {
      position: "bottom-center", 
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleRemoveProduct = (indexToRemove: number) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((_, index) => index !== indexToRemove)
    );
    toast.info("Producto eliminado del combo", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generar el mensaje para WhatsApp
    const productList = selectedProducts
      .map(
        (product, index) =>
          `${index + 1}.   ${product.name} - Color: ${product.color} - Talla: ${
            product.size
          }`
      )
      .join("\n");

      const message = `
      *¡Nuevo Pedido Realizado!*\n
      
      *Cliente:* ${formData.name} ${formData.lastname}\n 
      *Teléfono:* ${formData.phone}\n
      *Correo:* ${formData.email}\n
      *Dirección:* ${formData.address}, ${formData.city}\n  
      
      *Productos en el Combo:*
      ${productList}
      
      *Total a Pagar:* *$130.000 COP*\n
      
      *¡Gracias por tu compra! Nos pondremos en contacto contigo pronto.*
      `.trim();


    // Crear el enlace de WhatsApp
    const phoneNumber = "573105083429";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Abrir WhatsApp
    try {
      window.open(whatsappLink, "_blank");
    } catch (error) {
      console.log(error);
      toast.error("No se pudo abrir WhatsApp. Intenta de nuevo.", {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <Header />

      <Hero />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div id="product-selection" className="grid md:grid-cols-2 gap-12">

          {/* Product Preview */}
          <div className="space-y-8">

            {/* Main Product */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl flex items-center justify-center">
              <img
              src={currentProduct.images.front}
              alt={currentProduct.name}
              className="object-cover w-[80%] h-max transform transition-transform hover:scale-105 translate-y-4"
              id="product-image"
              />
              <button
              onClick={() => {
                setCurrentProduct((prevProduct) => ({
                  ...prevProduct,
                  images: {
                    ...prevProduct.images,
                    front: prevProduct.images.front === currentProduct.images.front ? currentProduct.images.back : currentProduct.images.front,
                    back: prevProduct.images.back === currentProduct.images.back ? currentProduct.images.front : currentProduct.images.back,
                  },
                }));
              }}
              className="absolute bottom-2 right-4 bg-yellow-500 text-black px-2 py-1 rounded"
              >
              <RefreshCcw />
              </button>
            </div>

            {/* Product Carousel */}
            <div className="grid grid-cols-3 gap-4">
              {selectedProducts.map((product, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden border-2 border-yellow-500"
                >
                  <img
                    src={product.images.front}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                  <div className="absolute bottom-0 w-full bg-black/50 text-white text-center py-1 text-sm">
                    {product.color} - {product.size}
                  </div>
                </div>
              ))}
              {[...Array(3 - selectedProducts.length)].map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center flex-col"
                >
                  <ShoppingBag className="text-gray-400" />
                  <p className="text-gray-500">Producto {selectedProducts.length + index + 1}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Product Details and Selection */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">{currentProduct.name}</h3>
              <div className="space-y-4">

                {/* color selection */}
                <div>
                  <Label>Color</Label>
                  <Select
                    value={selectedColor || "Selecciona"}
                    onValueChange={(value) => setSelectedColor(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Selecciona" disabled>
                        Selecciona un color
                      </SelectItem>
                      {currentProduct.colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* size selection */}
                <div>
                  <Label>Talla</Label>
                  <Select
                    value={selectedSize || "Selecciona"}
                    onValueChange={(value) => setSelectedSize(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una talla" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Selecciona" disabled>
                        Selecciona una talla
                      </SelectItem>
                      {currentProduct.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* add product button */}
                <Button
                  onClick={handleAddProduct}
                  disabled={
                    selectedProducts.length >= 3 
                  }
                  className={`w-full ${
                    selectedColor === "Selecciona" || selectedSize === "Selecciona" || selectedProducts.length >= 3
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-yellow-500 text-black hover:bg-yellow-600"
                  } transition font-bold`}
                >
                  Añadir al combo
                </Button>

                {selectedProducts.length >= 3 && (
                  <p className="text-sm text-red-500 mt-2">
                    Ya has alcanzado el límite de productos seleccionados.
                  </p>
                )}

              </div>
            </div>

            {/* Selected Products */}
            <div className="bg-primary/5 p-6 rounded-xl">
              <h4 className="font-bold text-lg mb-4">
                Productos seleccionados ({selectedProducts.length}/3)
              </h4>
              <div className="space-y-4">
                {selectedProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white p-3 rounded-lg shadow relative"
                  >
                    <img
                      src={product.images.front}
                      alt={product.name}
                      className="w-16 h-16 rounded-full border object-cover"
                    />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Color: {product.color || "Sin elegir"}, Talla:{" "}
                        {product.size || "Sin elegir"}
                      </p>
                    </div>

                    {/* Botón de eliminar */}
                    <button
                      onClick={() => handleRemoveProduct(index)}
                      className="absolute top-2 right-2"
                    >
                      ✖
                    </button>

                  </div>
                ))}
              </div>
            </div>

            {/* order button */}
            <Button
              size="lg"
              onClick={() => setShowForm(true)}
              disabled={!canProceed}
              className="w-full  bg-yellow-500 text-black hover:bg-yellow-600 transition font-bold text-lg py-6"
            >
              Comprar Ahora - $130.000 COP
            </Button>
              {!canProceed && (
                <span className="font-semibold flex justify-center items-center text-red-600 -translate-y-4">
                  Selecciona 3 productos para continuar.
                </span>
              )}

          </div>
        </div>

        {/* Product Selection */}
        <ScrollArea className="w-full mt-12" id="products">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
            {productsData.map((product) => (
              <button
                key={product.id}
                onClick={() => setCurrentProduct(product)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  currentProduct.id === product.id
                    ? "border-yellow-500 shadow-lg scale-105"
                    : "border-gray-200 hover:border-yellow-500"
                }`}
              >
                <img
                  src={product.images.front}
                  alt={product.name}
                  onMouseEnter={(e) => (e.currentTarget.src = product.images.back)}
                  onMouseLeave={(e) => (e.currentTarget.src = product.images.front)}
                  className="object-cover w-[75%] h-full mx-auto transform transition-transform"
                />
              </button>
            ))}
          </div>
        </ScrollArea>

        {/* Size Chart */}
        <SizeChart />

      </main>

      {/* Customer Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Datos de Envío
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombres</Label>
              <Input
                id="name"
                required
                className="bg-gray-50"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastname">Apellidos</Label>
              <Input
                id="lastname"
                required
                className="bg-gray-50"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Celular / WhatsApp</Label>
              <Input
                id="phone"
                type="tel"
                required
                className="bg-gray-50"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                required
                className="bg-gray-50"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                required
                className="bg-gray-50"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                required
                className="bg-gray-50"
                onChange={handleInputChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full  bg-yellow-500 text-black hover:bg-yellow-600 transition font-bold py-6"
            >
              Confirmar Pedido
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Footer />

      {/* toast */}
      <ToastContainer />

    </div>
  );
}
