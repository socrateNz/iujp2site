"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, Variants } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  {
    image: '/Images/hero.webp',
    tag: "BAFANG · CAMEROUN",
    title: <>L'UNIVERSITÉ OÙ VOTRE AVENIR <span className="text-[#E3A402]"> SE DESSINE!</span> </>,
    subtitle: "Science et conscience pour un monde meilleur",
    ctaPrimary: { text: "Candidature", href: "/contacts" },
    ctaSecondary: { text: "Découvrir l'université", href: "/nos-ecoles" },
    color: "from-[#205C03]/60 to-[#0B30BB]/40",
  },
  {
    image: '/Images/campus.webp',
    tag: "NOS ÉCOLES",
    title: <>DES ÉTABLISSEMENTS <span className="text-[#E3A402]">D'EXCELLENCE</span></>,
    subtitle: "Un environnement propice à l'épanouissement et à la réussite",
    ctaPrimary: { text: "Voir les écoles", href: "/nos-ecoles" },
    ctaSecondary: { text: "Nos formations", href: "/formations" },
    color: "from-[#011636]/70 to-[#205C03]/40",
  },
  {
    image: '/Images/etudiants.webp',
    tag: "FORMATIONS",
    title: <>FORMEZ-VOUS AUX MÉTIERS<span className="text-[#E3A402]"> DE DEMAIN !</span></>,
    subtitle: "Des programmes conçus pour développer vos compétences professionnelles",
    ctaPrimary: { text: "Voir les formations", href: "/formations" },
    ctaSecondary: { text: "Télécharger le catalogue", href: "/catalogue.pdf" },
    color: "from-[#0B30BB]/60 to-[#205C03]/40",
  },
  {
    image: '/Images/laureats.webp',
    tag: "RÉUSSITE",
    title: <>ÉLEVEZ VOS COMPÉTENCES, <span className="text-[#E3A402]">BOOSTEZ VOTRE FUTUR !</span></>,
    subtitle: "98% de taux de réussite — rejoignez nos lauréats d'excellence",
    ctaPrimary: { text: "S'inscrire", href: "/contacts" },
    ctaSecondary: { text: "Actualités", href: "/actualites" },
    color: "from-[#011636]/70 to-[#0B30BB]/40",
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX - innerWidth / 2) / 60,
        y: (clientY - innerHeight / 2) / 60,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % items.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = useCallback(() => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  }, []);

  const handleNext = useCallback(() => {
    setIsAutoPlaying(false);
    setDirection(1);
    setIndex((prev) => (prev + 1) % items.length);
  }, []);

  const pageTransition: Variants = {
    initial: { opacity: 0, scale: 1.15, filter: "blur(8px)" },
    animate: {
      opacity: 1, scale: 1, filter: "blur(0px)",
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0, scale: 0.9, filter: "blur(8px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.06, staggerDirection: -1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0, opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      y: -20, opacity: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    x.set(mousePosition.x);
    y.set(mousePosition.y);
  }, [mousePosition, x, y]);

  const springX = useSpring(useTransform(x, [-1, 1], [-15, 15]), { stiffness: 80, damping: 25 });
  const springY = useSpring(useTransform(y, [-1, 1], [-15, 15]), { stiffness: 80, damping: 25 });

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100vh - 100px)", minHeight: "580px" }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* ── Background ── */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={items[index].image}
          custom={direction}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${items[index].image})`, x: springX, y: springY, scale: 1.08 }}
          />
          {/* Overlay dynamique couleur UIJP */}
          <div className={`absolute inset-0 bg-gradient-to-r ${items[index].color}`} />
          {/* Overlay sombre bas */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Contenu principal ── */}
      <div className="relative z-10 flex flex-col justify-center h-full px-4 md:px-16 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={items[index].tag}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-3xl"
          >
            {/* Tag UIJP */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="tag-uijp">{items[index].tag}</span>
            </motion.div>

            {/* Titre UIJP : massif, condensé, uppercase */}
            <motion.h1
              variants={itemVariants}
              className="text-white mb-4"
              style={{
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1.0,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
            >
              {items[index].title}
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              variants={itemVariants}
              className="text-white/85 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              {items[index].subtitle}
            </motion.p>

            {/* CTA Buttons UIJP */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link href={items[index].ctaPrimary.href} className="btn-uijp text-base">
                {items[index].ctaPrimary.text}
              </Link>
              <Link href={items[index].ctaSecondary.href} className="btn-uijp-outline text-base">
                {items[index].ctaSecondary.text}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation flèches ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-5">
        <motion.button
          onClick={handlePrevious}
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/25 hover:bg-white/20 transition-colors"
          aria-label="Précédent"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); setIsAutoPlaying(false); }}
              className="relative"
            >
              <motion.div
                className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-8" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                style={i === index ? { background: "linear-gradient(90deg, #205C03, #0B30BB)" } : {}}
              />
            </button>
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/25 hover:bg-white/20 transition-colors"
          aria-label="Suivant"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* ── Barre de progression ── */}
      <motion.div
        key={`progress-${index}`}
        className="absolute bottom-0 left-0 h-1 z-20"
        style={{ background: "linear-gradient(90deg, #205C03 0%, #0B30BB 100%)" }}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 7, ease: "linear" }}
      />

      {/* ── Compteur slide ── */}
      <div
        className="absolute top-6 right-6 md:top-8 md:right-8 z-20 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-xs font-mono"
      >
        {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
      </div>
    </div>
  );
}