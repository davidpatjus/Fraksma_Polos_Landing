import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Facebook, Instagram, TwitterIcon as TikTok, ShoppingBag, ArrowRight, Clock } from 'lucide-react'
import { productsData, Product } from './lib/productsData'

export default function Component() {
  const [selectedProducts, setSelectedProducts] = useState<
    (Product & { size?: string; color?: string })[]
  >([]);
  const [showForm, setShowForm] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(productsData[0])
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

  const handleAddProduct = () => {
    if (selectedProducts.length < 3) {
      setSelectedProducts([
        ...selectedProducts,
        {
          ...currentProduct,
          size: selectedSize,
          color: selectedColor,
        },
      ]);
      setSelectedColor(undefined);
      setSelectedSize(undefined);
    }
  };

  const canProceed = selectedProducts.length === 3

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden lg:py-72">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/Banner_Fraksma.png')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
              ¡Mega Oferta de Black Friday!
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Escoge tus 3 polos favoritos por tan solo{' '}
              <span className="font-bold text-2xl text-yellow-400">$130.000</span>
            </p>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
              onClick={() =>
                document.getElementById('product-selection')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }
            >
              Comprar Ahora <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>


      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div id="product-selection" className="grid md:grid-cols-2 gap-12">
          {/* Product Preview */}
          <div className="space-y-8">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl flex items-center justify-center">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="object-cover w-[80%] h-max transform transition-transform hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {selectedProducts.map((product, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-yellow-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                </div>
              ))}
              {[...Array(3 - selectedProducts.length)].map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <ShoppingBag className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details and Selection */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">{currentProduct.name}</h3>
              <div className="space-y-4">
                <div>
                  <Label>Color</Label>
                  <Select
                    value={selectedColor || undefined}
                    onValueChange={(value) => setSelectedColor(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un color" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentProduct.colors.map(color => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Talla</Label>
                  <Select
                    value={selectedSize || undefined}
                    onValueChange={(value) => setSelectedSize(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una talla" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentProduct.sizes.map(size => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleAddProduct}
                  disabled={
                    selectedProducts.length >= 3 || !selectedColor || !selectedSize
                  }
                  className="w-full bg-yellow-500 text-black hover:bg-yellow-600 transition font-bold"
                >
                  Añadir al combo
                </Button>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-xl">
              <h4 className="font-bold text-lg mb-4">
                Productos seleccionados ({selectedProducts.length}/3)
              </h4>
              <div className="space-y-4">
                {selectedProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white p-3 rounded-lg shadow">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-full border object-cover"
                    />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Color: {product.color || 'Sin elegir'}, Talla: {product.size || 'Sin elegir'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => setShowForm(true)}
              disabled={!canProceed}
              className="w-full  bg-yellow-500 text-black hover:bg-yellow-600 transition font-bold text-lg py-6"
            >
              Comprar Ahora - $130.000 COP
            </Button>
          </div>
        </div>

        {/* Product Selection */}
        <ScrollArea className="w-full mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
            {productsData.map((product) => (
              <button
                key={product.id}
                onClick={() => setCurrentProduct(product)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  currentProduct.id === product.id ? 'border-yellow-500 shadow-lg scale-105' : 'border-gray-200 hover:border-yellow-500'
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </ScrollArea>

        {/* Size Chart */}
        <section className="my-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4 text-primary">Confianza Fraksma</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ¿No estás seguro de tu talla? Consulta nuestra guía de tallas. Cambios garantizados para tu tranquilidad.
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
                onClick={() => window.open('/tallasFraksma.webp', '_blank')}
                className="px-6 py-3 text-lg font-bold bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition-colors"
              >
                Ver Guía de Tallas
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Customer Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Datos de Envío</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombres</Label>
              <Input id="name" required className="bg-gray-50" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastname">Apellidos</Label>
              <Input id="lastname" required className="bg-gray-50" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Celular / WhatsApp</Label>
              <Input id="phone" type="tel" required className="bg-gray-50" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" required className="bg-gray-50" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" required className="bg-gray-50" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input id="city" required className="bg-gray-50" />
            </div>
            <Button type="submit" className="w-full  bg-yellow-500 text-black hover:bg-yellow-600 transition font-bold py-6">
              Confirmar Pedido
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img 
                src="/isotipo_blanco-Fraksma.png" 
                alt="FraksmaSport" 
                className="h-12 w-auto"
              />
            </div>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/fraksma_fs/" className="hover:text-yellow-400 transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.facebook.com/people/Fraksma-Sport/100089909617819/" className="hover:text-yellow-400 transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://www.tiktok.com/@fraksmasport_fs" className="hover:text-yellow-400 transition-colors">
                <TikTok className="h-6 w-6" />
                <span className="sr-only">TikTok</span>
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            © 2023 FraksmaSport. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}