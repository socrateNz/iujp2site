"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaDownload } from "react-icons/fa";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Tableau d'images pour le carrousel
  const images = [
    '/Images/hero.webp',
    '/Images/campus.webp', // Ajoutez vos images ici
    '/Images/histoire.webp',
    // Ajoutez autant d'images que nécessaire
  ];

  useEffect(() => {
    // Animation d'entrée
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Rotation des images toutes les 5 secondes
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <section id="accueil" className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A4A]/90 to-transparent z-10"></div>
      
      {/* Carrousel d'images */}
      <div className="absolute inset-0 overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url('${image}')`,
              transitionDelay: index === currentImageIndex ? '0.6ms' : '0.6ms'
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="max-w-2xl text-white">
          <h1 
            className={`text-[40px] md:text-6xl font-serif font-bold mb-4 transition-all duration-500 transform ease-in-out ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '0.3s' }}
          >
            {"Université Internationale Jean Paul II de Bafang"}
          </h1>
          <p 
            className={`text-xl md:text-2xl mb-8 font-light italic transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '0.3s' }}
          >
            {"Science et conscience pour un monde meilleur"}
          </p>
          <div 
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '0.5s' }}
          >
            <Button onClick={() => router.push("/formations")} className="max-w-[260px] w-full cursor-pointer bg-[#34773D] hover:bg-[#34773D]/80 text-white py-6 text-lg !rounded-button whitespace-nowrap">
              {"Découvrir nos formations"}
            </Button>
            <Link href="/catalogue.pdf" target="_blank" rel="noopener noreferrer" className="w-auto">
              <Button variant="outline" className="max-w-[260px] w-full cursor-pointer text-white hover:text-white bg-[#1B2A4A]/80 hover:bg-[#1B2A4A]/30 px-8 py-6 text-lg !rounded-button whitespace-nowrap">
                <FaDownload className="mr-2" />
                {"Télécharger le catalogue"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-20 z-10"></div>
    </section>
  )
};

export default HeroSection;