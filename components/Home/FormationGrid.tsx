"use client";

import React from "react";
import { ArrowRight, Loader, Clock } from "lucide-react";
import { Filiere } from "@/lib/types";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  formationsList: Filiere[];
}

// Couleurs alternantes pour les cartes UIJP II
const cardStyles = [
  { borderLeft: "#205C03", borderBottom: "#0B30BB" },
  { borderLeft: "#0B30BB", borderBottom: "#E3A402" },
  { borderLeft: "#E3A402", borderBottom: "#205C03" },
  { borderLeft: "#205C03", borderBottom: "#069CC5" },
  { borderLeft: "#0B30BB", borderBottom: "#205C03" },
  { borderLeft: "#205C03", borderBottom: "#0B30BB" },
];

const FormationGrid = ({ formationsList }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-1 md:mx-4">
      {formationsList.map((formation, index) => {
        const style = cardStyles[index % cardStyles.length];
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
            className="group"
          >
            <div
              className="bg-white flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
              style={{
                borderLeft: `4px solid ${style.borderLeft}`,
                borderBottom: `4px solid ${style.borderBottom}`,
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                borderRadius: "2px",
              }}
            >
              {/* Image */}
              <div className="h-52 overflow-hidden">
                <img
                  src={formation.image}
                  alt={formation.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Contenu */}
              <div className="flex flex-col flex-1 p-6">
                {/* Badge durée */}
                <div className="mb-3">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-white text-xs font-bold uppercase tracking-widest"
                    style={{
                      background: `linear-gradient(135deg, ${style.borderLeft} 0%, ${style.borderBottom} 100%)`,
                      fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                    }}
                  >
                    <Clock size={11} />
                    {formation.duration} {Number(formation.duration) > 1 ? "ans" : "an"}
                  </span>
                </div>

                {/* Titre */}
                <h3
                  className="font-bold text-[#2D2F2B] mb-2 text-base leading-snug uppercase"
                  style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", letterSpacing: "0.03em" }}
                >
                  {formation.title}
                </h3>

                {/* Description */}
                <p
                  className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-5"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  {formation.description}
                </p>

                {/* Lien UIJP */}
                <Link href={`/formations/${formation._id}`} className="link-uijp inline-flex items-center gap-2 self-start">
                  DÉCOUVRIR LA FORMATION
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FormationGrid;
