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
    image: '/Images/etudiants.webp',
    title: "Un avénir assuré",
    description: "Nos programmes sont conçus pour développer vos compétences, vous préparer aux défis du marché et garantir un apprentissage pratique et efficace.",
    textButton: "Voir les formations",
    url: "/formations"
  },
  {
    image: '/Images/admin.webp',
    title: "Un personnel qualifié et spécialisé",
    description: "Nos établissement recrutent un personnel hautement qualifié pour accompagner les etudiants",
    textButton: "Nos écoles",
    url: "/nos-ecoles"
  },
  {
    image: '/Images/laureats.webp',
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