import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
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
            <a
              href="https://www.instagram.com/fraksma_fs/"
              className="hover:text-yellow-400 transition-colors"
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/people/Fraksma-Sport/100089909617819/"
              className="hover:text-yellow-400 transition-colors"
            >
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="https://www.tiktok.com/@fraksmasport_fs"
              className="hover:text-yellow-400 transition-colors"
            >
              <p className="h-6 w-6 font-bold text-xl">TK</p>
              <span className="sr-only">TikTok</span>
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          © 2023 FraksmaSport. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
