// "use client";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FaDownload } from "react-icons/fa";
// import { useEffect, useState } from "react";

// const HeroSection = () => {
//   const router = useRouter();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLoaded, setIsLoaded] = useState(false);

//   // Tableau d'images pour le carrousel
//   const images = [
//     '/Images/hero.webp',
//     '/Images/campus.webp', // Ajoutez vos images ici
//     '/Images/histoire.webp',
//     // Ajoutez autant d'images que nécessaire
//   ];

//   useEffect(() => {
//     // Animation d'entrée
//     const timer = setTimeout(() => {
//       setIsLoaded(true);
//     }, 100);

//     // Rotation des images toutes les 5 secondes
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => 
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000);

//     return () => {
//       clearTimeout(timer);
//       clearInterval(interval);
//     };
//   }, [images.length]);

//   return (
//     <section id="accueil" className="relative h-[70vh] overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A4A]/90 to-transparent z-10"></div>

//       {/* Carrousel d'images */}
//       <div className="absolute inset-0 overflow-hidden">
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 bg-cover bg-center transition-all ease-in-out duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
//             style={{
//               backgroundImage: `url('${image}')`,
//               transitionDelay: index === currentImageIndex ? '0.6ms' : '0.6ms'
//             }}
//           ></div>
//         ))}
//       </div>

//       <div className="container mx-auto px-4 h-full flex items-center relative z-20">
//         <div className="max-w-2xl text-white">
//           <h1 
//             className={`text-[40px] md:text-6xl font-serif font-bold mb-4 transition-all duration-500 transform ease-in-out ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
//             style={{ transitionDelay: '0.3s' }}
//           >
//             {"Université Internationale Jean Paul II de Bafang"}
//           </h1>
//           <p 
//             className={`text-xl md:text-2xl mb-8 font-light italic transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
//             style={{ transitionDelay: '0.3s' }}
//           >
//             {"Science et conscience pour un monde meilleur"}
//           </p>
//           <div 
//             className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
//             style={{ transitionDelay: '0.5s' }}
//           >
//             <Button onClick={() => router.push("/formations")} className="max-w-[260px] w-full cursor-pointer bg-[#34773D] hover:bg-[#34773D]/80 text-white py-6 text-lg !rounded-button whitespace-nowrap">
//               {"Découvrir nos formations"}
//             </Button>
//             <Link href="/catalogue.pdf" target="_blank" rel="noopener noreferrer" className="w-auto">
//               <Button variant="outline" className="max-w-[260px] w-full cursor-pointer text-white hover:text-white bg-[#1B2A4A]/80 hover:bg-[#1B2A4A]/30 px-8 py-6 text-lg !rounded-button whitespace-nowrap">
//                 <FaDownload className="mr-2" />
//                 {"Télécharger le catalogue"}
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//       {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-20 z-10"></div> */}
//     </section>
//   )
// };

// export default HeroSection;

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const items = [
  {
    image: '/Images/hero.webp',
    title: "Université Internationale Jean Paul II de Bafang",
    description: "Science et conscience pour un monde meilleur",
    textButton: "Télécharger le catalogue",
    url: "/catalogue.pdf"
  },
  {
    image: '/Images/campus.webp',
    title: "Des écoles de qualité pour un avenir prometteur",
    description: "Découvrez des établissements reconnus pour leur excellence académique, offrant un environnement propice à l’épanouissement et à la réussite de chaque élève.",
    textButton: "Voir les écoles",
    url: "/nos-ecoles"
  },
  {
    image: '/Images/formation.webp',
    title: "Élevez vos compétences, boostez votre futur",
    description: "Nos programmes sont conçus pour développer vos compétences, vous préparer aux défis du marché et garantir un apprentissage pratique et efficace.",
    textButton: "Consulter les formations",
    url: "/formations"
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  // Auto-slide toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Background avec transition */}
      <div className="absolute inset-0 flex">
        <AnimatePresence initial={false}>
          <motion.div
            key={items[index].image}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${items[index].image})` }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-10 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={items[index].title}
            className="space-y-4 max-w-4xl mx-auto"
          >
            {/* Titre */}
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl md:text-6xl lg:text-[72px] font-bold font-serif tracking-[-5%]"
            >
              {items[index].title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xl md:text-2xl mb-8 font-light italic"
            >
              {items[index].description}
            </motion.p>

            {/* Bouton */}
            <Link href={items[index].url}>
              <motion.button
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="px-6 py-3 rounded-lg shadow-lg transition cursor-pointer hover:text-white bg-[#1B2A4A]/80 hover:bg-[#1B2A4A]/30"
              >
                {items[index].textButton}
              </motion.button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}