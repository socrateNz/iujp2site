"use client";

import { motion } from "framer-motion";
import { Award, Globe, Lightbulb, Heart } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Award className="w-6 h-6" />,
    title: "Excellence académique",
    description: "Des programmes rigoureux et des enseignants de haut niveau pour votre réussite.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Dimension internationale",
    description: "Des partenariats avec des universités prestigieuses à travers le monde.",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Innovation pédagogique",
    description: "Des méthodes d'enseignement adaptées aux réalités contemporaines.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Engagement spirituel",
    description: "Une formation qui renforce la foi, les valeurs chrétiennes et le sens du service.",
  },
];

const AboutSection = () => {
  return (
    <section id="a-propos" className="py-24" style={{ background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Image côté gauche ── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "0.25rem",
                borderLeft: "6px solid #205C03",
                borderBottom: "6px solid #0B30BB",
              }}
            >
              <img
                src="/Images/histoire.webp"
                alt="Histoire de l'UIJP2"
                className="w-full object-cover object-top"
                style={{ height: "520px" }}
              />
              {/* Overlay dégradé léger */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, rgba(32,92,3,0.12) 0%, rgba(11,48,187,0.08) 100%)",
                }}
              />
            </div>

            {/* Badge flottant */}
            <div
              className="absolute -bottom-5 -right-5 hidden md:flex flex-col items-center justify-center text-white font-bold text-center rounded-sm px-6 py-4 shadow-xl"
              style={{
                background: "linear-gradient(135deg, #205C03 0%, #0B30BB 100%)",
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                minWidth: "130px",
              }}
            >
              <span className="text-4xl font-black leading-none">2015</span>
              <span className="text-xs uppercase tracking-widest mt-1 opacity-90">Fondée en</span>
            </div>
          </motion.div>

          {/* ── Texte côté droit ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {/* Section header UIJP 2 lignes */}
            <div className="mb-8">
              <h2 className="uijp-section-title">
                À propos de
                <span>notre université</span>
              </h2>
              <div
                className="mt-3 h-1 w-16 rounded-full"
                style={{ background: "linear-gradient(90deg, #205C03, #0B30BB)" }}
              />
            </div>

            <p
              className="text-gray-700 mb-5 leading-relaxed"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "1rem" }}
            >
              Fondé en 2015 par{" "}
              <strong className="text-[#2D2F2B]">
                Mgr. Abraham KOME, Évêque du Diocèse de Bafang, Grand Chancelier et Administrateur principal
              </strong>
              , l'Université Internationale Jean Paul II de Bafang s'est imposée comme un établissement
              d'excellence dans le paysage de l'enseignement supérieur camerounais.
            </p>
            <p
              className="text-gray-700 mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "1rem" }}
            >
              Notre mission est de former des esprits critiques, créatifs et engagés, capables de relever
              les défis complexes du monde contemporain, dans un environnement où rigueur académique,
              ouverture internationale et accompagnement spirituel se conjuguent.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <div
                    className="shrink-0 w-11 h-11 flex items-center justify-center rounded-sm text-white"
                    style={{ background: "linear-gradient(135deg, #205C03 0%, #0B30BB 100%)" }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h4
                      className="font-bold text-[#2D2F2B] mb-1 uppercase tracking-wide text-sm"
                      style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
                    >
                      {feature.title}
                    </h4>
                    <p
                      className="text-gray-500 text-sm leading-relaxed"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/nos-ecoles" className="btn-uijp">
              Découvrir l'université
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;