"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, Variants } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, GraduationCap, BookOpen, Users } from "lucide-react";

const items = [
  {
    image: '/Images/hero.webp',
    title: "Université Internationale Jean Paul II de Bafang",
    subtitle: "Science et conscience",
    highlight: "pour un monde meilleur",
    description: "Une institution d'excellence dédiée à la formation des leaders de demain, alliant rigueur académique et valeurs humaines.",
    textButton: "Télécharger le catalogue",
    url: "/catalogue.pdf",
    icon: GraduationCap,
    color: "from-blue-600 to-purple-600"
  },
  {
    image: '/Images/campus.webp',
    title: "Des écoles de qualité",
    subtitle: "Pour un avenir",
    highlight: "prometteur",
    description: "Découvrez des établissements reconnus pour leur excellence académique, offrant un environnement propice à l'épanouissement et à la réussite de chaque élève.",
    textButton: "Voir les écoles",
    url: "/nos-ecoles",
    icon: BookOpen,
    color: "from-emerald-600 to-teal-600"
  },
  {
    image: '/Images/etudiants.webp',
    title: "Un avenir assuré",
    subtitle: "Formez-vous aux",
    highlight: "métiers de demain",
    description: "Nos programmes sont conçus pour développer vos compétences, vous préparer aux défis du marché et garantir un apprentissage pratique et efficace.",
    textButton: "Voir les formations",
    url: "/formations",
    icon: Sparkles,
    color: "from-amber-600 to-orange-600"
  },
  {
    image: '/Images/admin.webp',
    title: "Un personnel qualifié",
    subtitle: "et spécialisé",
    highlight: "pour votre réussite",
    description: "Nos établissements recrutent un personnel hautement qualifié pour accompagner les étudiants vers l'excellence.",
    textButton: "Nos écoles",
    url: "/nos-ecoles",
    icon: Users,
    color: "from-rose-600 to-pink-600"
  },
  {
    image: '/Images/laureats.webp',
    title: "Élevez vos compétences",
    subtitle: "Boostez",
    highlight: "votre futur",
    description: "Nos programmes sont conçus pour développer vos compétences, vous préparer aux défis du marché et garantir un apprentissage pratique et efficace.",
    textButton: "Consulter les formations",
    url: "/formations",
    icon: Sparkles,
    color: "from-indigo-600 to-violet-600"
  },
];

// Composant pour le texte avec effet de révélation
const RevealText = ({ children, delay = 0, className = "" }: { children: string; delay?: number; className?: string }) => {
  return (
    <span className="relative inline-block overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={className}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse move handler pour effet parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX - innerWidth / 2) / 50,
        y: (clientY - innerHeight / 2) / 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-slide avec pause au survol
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % items.length);
    }, 8000);

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

  // Animation variants avec types corrects
  const pageTransition: Variants = {
    initial: (direction: number) => ({
      opacity: 0,
      scale: 1.2,
      filter: "blur(10px)",
    }),
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
        scale: {
          duration: 1.8,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)",
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const buttonVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.8
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 30px -10px rgba(0,0,0,0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const CurrentIcon = items[index].icon;

  // Valeurs animées pour le parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    x.set(mousePosition.x);
    y.set(mousePosition.y);
  }, [mousePosition, x, y]);

  const springX = useSpring(useTransform(x, [-1, 1], [-20, 20]), {
    stiffness: 100,
    damping: 30
  });

  const springY = useSpring(useTransform(y, [-1, 1], [-20, 20]), {
    stiffness: 100,
    damping: 30
  });

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background avec effet de zoom et parallax */}
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
          {/* Image avec effet parallax */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${items[index].image})`,
              x: springX,
              y: springY,
              scale: 1.1
            }}
          />

          {/* Overlay dynamique */}
          <div className={`absolute inset-0 bg-gradient-to-r ${items[index].color} mix-blend-multiply opacity-60`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Particules animées - version corrigée avec vérification de window */}
      {typeof window !== 'undefined' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-4 md:px-20 text-white max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={items[index].title}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8 max-w-4xl"
          >
            {/* Badge avec icône */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            >
              <CurrentIcon className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">
                {items[index].subtitle}
              </span>
            </motion.div>

            {/* Titre */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold leading-[1.1]"
            >
              {items[index].title}
            </motion.h1>

            {/* Highlight avec animation séparée */}
            <motion.div
              variants={itemVariants}
              className="overflow-hidden"
            >
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`inline-block text-5xl md:text-7xl font-bold bg-gradient-to-r ${items[index].color} bg-clip-text text-transparent`}
              >
                {items[index].highlight}
              </motion.span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl"
            >
              {items[index].description}
            </motion.p>

            {/* Bouton */}
            <motion.div
              variants={buttonVariants}
            >
              <Link href={items[index].url}>
                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                  className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-semibold inline-flex items-center gap-3 group relative overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  <span className="relative z-10">{items[index].textButton}</span>
                  <motion.div
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation avec effets modernes */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        {/* Flèches */}
        <motion.button
          onClick={handlePrevious}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white/20 transition-colors"
          aria-label="Précédent"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Dots animés */}
        <div className="flex gap-3">
          {items.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
                setIsAutoPlaying(false);
              }}
              className="relative group"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${i === index ? 'bg-white' : 'bg-white/40 group-hover:bg-white/60'
                  }`}
                animate={i === index ? {
                  scale: [1, 1.2, 1],
                } : {}}
                transition={i === index ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                } : {}}
              />
              {i === index && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/30"
                  animate={{
                    scale: [1, 2],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Flèche droite */}
        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white/20 transition-colors"
          aria-label="Suivant"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Barre de progression créative */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 z-20"
        style={{
          background: `linear-gradient(90deg, ${items[index].color.split(' ')[1]} 0%, ${items[index].color.split(' ')[3]} 100%)`
        }}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{
          duration: 8,
          ease: "linear",
          repeat: isAutoPlaying ? Infinity : 0,
          repeatType: "loop"
        }}
        key={index}
      />

      {/* Indicateur de slide */}
      <motion.div
        className="absolute top-12 right-12 z-20 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-mono"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
      </motion.div>
    </div>
  );
}