"use client";

import { news, News } from '@/data/data';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
    article: News;
}

const cardStyles = [
    { borderLeft: "#205C03", borderBottom: "#0B30BB" },
    { borderLeft: "#0B30BB", borderBottom: "#E3A402" },
];

const Similaire = ({ article }: Props) => {
    const router = useRouter();
    const similaires = news.filter(x => x._id !== article._id && x.category === article.category).slice(0, 4);

    if (similaires.length === 0) return null;

    return (
        <section className="mt-8">
            <div className="mb-6">
                <h2
                    className="font-black text-[#2D2F2B] uppercase"
                    style={{
                        fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                        fontSize: "1.5rem",
                        letterSpacing: "0.04em",
                    }}
                >
                    Articles
                    <span
                        className="block"
                        style={{
                            background: "linear-gradient(135deg, #205C03 0%, #0B30BB 100%)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        recommandés
                    </span>
                </h2>
                <div
                    className="mt-2 h-1 w-10 rounded-full"
                    style={{ background: "linear-gradient(90deg, #205C03, #0B30BB)" }}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {similaires.map((item, index) => {
                    const style = cardStyles[index % cardStyles.length];
                    return (
                        <motion.div
                            key={index}
                            className="group cursor-pointer"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            onClick={() => router.push(`/actualites/${item._id}`)}
                        >
                            <div
                                className="bg-white flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    borderLeft: `4px solid ${style.borderLeft}`,
                                    borderBottom: `4px solid ${style.borderBottom}`,
                                    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                                    borderRadius: "2px",
                                }}
                            >
                                <div className="h-40 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <span
                                            className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest text-white"
                                            style={{
                                                background: `linear-gradient(135deg, ${style.borderLeft} 0%, ${style.borderBottom} 100%)`,
                                                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                                                borderRadius: "2px",
                                            }}
                                        >
                                            {item.category}
                                        </span>
                                        <span
                                            className="flex items-center gap-1 text-xs text-gray-400"
                                            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                                        >
                                            <Calendar size={11} />
                                            {item.date}
                                        </span>
                                    </div>
                                    <h3
                                        className="font-bold text-[#2D2F2B] text-sm leading-snug uppercase mb-3 flex-1"
                                        style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", letterSpacing: "0.03em" }}
                                    >
                                        {item.title}
                                    </h3>
                                    <span className="link-uijp inline-flex items-center gap-1.5 self-start text-xs">
                                        LIRE
                                        <ArrowRight size={12} />
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Similaire;
