export const productsData = [
    {
      id: 1,
      name: "Polo Classic 1",
      price: 29.99,
      colors: ["Negro", "Blanco", "Azul"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      image: "/camisa-1-min.png"
    },
    {
      id: 2,
      name: "Polo Classic 2",
      price: 29.99,
      colors: ["Negro", "Blanco", "Azul"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      image: "/camisa-2-min.png"
    },
    {
      id: 3,
      name: "Polo Classic 3",
      price: 29.99,
      colors: ["Negro", "Blanco", "Azul"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      image: "/camisa-3-min.png"
    },
    {
      id: 4,
      name: "Polo Classic 4",
      price: 29.99,
      colors: ["Negro", "Blanco", "Azul"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      image: "/camisa-4-min.png"
    },
    {
      id: 5,
      name: "Polo Classic 5",
      price: 29.99,
      colors: ["Negro", "Blanco", "Azul"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      image: "/camisa-5-min.png"
    },
    {
      id: 6,
      name: "Polo Classic 6",
      price: 29.99,
      colors: ["Negro", "Blanco", "Azul"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      image: "/camisa-6-min.png"
    },
    {
      id: 7,
      name: "Polo Classic 7",
      price: 29.99,
      colors: ["Negro", "Blanco", "Azul"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      image: "/camisa-7-min.png"
    },
    {
      id: 8,
      name: "Polo Classic 8",
      price: 29.99,
      colors: ["Negro", "Blanco", "Azul"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      image: "/camisa-8-min.png"
    },
    // Add more products as needed
  ]
  
  export interface Product {
    id: number
    name: string
    color?: string
    size?: string
    image: string
  }