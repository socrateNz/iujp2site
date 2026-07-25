"use client";

import React from 'react';
import { News } from "@/data/data";
import { useRouter } from "next/navigation";
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface GridNewsProps {
  articles?: News[];
}

const cardStyles = [
  { borderLeft: "#205C03", borderBottom: "#0B30BB" },
  { borderLeft: "#0B30BB", borderBottom: "#E3A402" },
  { borderLeft: "#E3A402", borderBottom: "#205C03" },
];

const GridNews: React.FC<GridNewsProps> = ({ articles }) => {
  const router = useRouter();
  const data = articles && articles.length > 0 ? articles : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 py-6">
      {data.map((article, index) => {
        const style = cardStyles[index % cardStyles.length];
        return (
          <motion.div
            key={article._id}
            className="group"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
          >
            <div
              className="bg-white flex flex-col h-full cursor-pointer transition-all duration-300 hover:-translate-y-1"
              style={{
                borderLeft: `4px solid ${style.borderLeft}`,
                borderBottom: `4px solid ${style.borderBottom}`,
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                borderRadius: "2px",
              }}
              onClick={() => router.push(`/actualites/${article._id}`)}
            >
              {/* Image */}
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Contenu */}
              <div className="flex flex-col flex-1 p-6">
                {/* Badge catégorie + Date */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-white"
                    style={{
                      background: `linear-gradient(135deg, ${style.borderLeft} 0%, ${style.borderBottom} 100%)`,
                      fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                      borderRadius: "2px",
                    }}
                  >
                    {article.category}
                  </span>
                  <span
                    className="flex items-center gap-1.5 text-xs text-gray-400"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    <Calendar size={12} />
                    {article.date}
                  </span>
                </div>

                {/* Titre */}
                <h3
                  className="font-bold text-[#2D2F2B] mb-3 text-base leading-snug uppercase flex-1"
                  style={{
                    fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                    letterSpacing: "0.03em",
                  }}
                >
                  {article.title}
                </h3>

                {/* Description */}
                <p
                  className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  {article.description}
                </p>

                {/* Lien UIJP */}
                <span className="link-uijp inline-flex items-center gap-2 self-start">
                  LIRE L'ARTICLE
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default GridNews;
