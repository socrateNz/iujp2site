"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { News } from "@/data/data";
import { useRouter } from "next/navigation";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Article {
  articles: News[];
}

const cardAccents = [
  { borderLeft: "#205C03", borderBottom: "#0B30BB" },
  { borderLeft: "#0B30BB", borderBottom: "#E3A402" },
  { borderLeft: "#E3A402", borderBottom: "#205C03" },
];

const NewsSection = ({ articles }: Article) => {
  const router = useRouter();

  return (
    <section id="blog" className="py-24" style={{ background: "#f5f6fa" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ── En-tête UIJP ── */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="uijp-section-title">
            Actualités
            <span>de l'université</span>
          </h2>
          <div
            className="mt-3 h-1 w-16 rounded-full"
            style={{ background: "linear-gradient(90deg, #205C03, #0B30BB)" }}
          />
          <p
            className="mt-5 text-gray-500 max-w-2xl text-base leading-relaxed"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            Restez informés des dernières nouvelles, événements et réalisations de notre communauté universitaire.
          </p>
        </motion.div>

        {/* ── Grille d'articles ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles?.map((article, index) => {
            const accent = cardAccents[index % cardAccents.length];
            return (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="bg-white flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderLeft: `4px solid ${accent.borderLeft}`,
                    borderBottom: `4px solid ${accent.borderBottom}`,
                    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                    borderRadius: "2px",
                  }}
                >
                  {/* Image */}
                  <div className="h-52 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Badge + Date */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-white rounded-sm"
                        style={{
                          background: `linear-gradient(135deg, ${accent.borderLeft} 0%, ${accent.borderBottom} 100%)`,
                          fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
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
                        fontFamily: "var(--font-oswald), Oswald, sans-serif",
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
                    <button
                      onClick={() => router.push(`/actualites/${article._id}`)}
                      className="link-uijp inline-flex items-center gap-2 self-start"
                    >
                      LIRE L'ARTICLE
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="mt-14 text-center">
          <Link href="/actualites" className="btn-uijp">
            <Newspaper size={16} />
            Voir toutes les actualités
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;