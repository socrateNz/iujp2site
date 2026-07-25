"use client";

import { Ecole, Filiere } from '@/lib/types';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
    ecoles: Ecole[];
    filieres: Filiere[];
}

const cardStyles = [
    { borderLeft: "#205C03", borderBottom: "#0B30BB" },
    { borderLeft: "#0B30BB", borderBottom: "#E3A402" },
    { borderLeft: "#E3A402", borderBottom: "#205C03" },
    { borderLeft: "#205C03", borderBottom: "#069CC5" },
];

const GridEcole = ({ ecoles, filieres }: Props) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 px-4 md:px-8'>
            {ecoles.map((ecole, index) => {
                const filiere = filieres.filter((f) => f.ecoleId === ecole._id?.toString());
                const style = cardStyles[index % cardStyles.length];
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                        className="group"
                    >
                        <Link
                            href={`/nos-ecoles/${ecole._id}`}
                            className="flex flex-col h-full bg-white transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                            style={{
                                borderLeft: `4px solid ${style.borderLeft}`,
                                borderBottom: `4px solid ${style.borderBottom}`,
                                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                                borderRadius: "2px",
                            }}
                        >
                            {/* Image */}
                            <div className="w-full h-52 overflow-hidden">
                                <img
                                    src={ecole.image}
                                    alt={ecole.title}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Contenu */}
                            <div className="flex flex-col flex-1 p-6">
                                {/* Badge nombre de formations */}
                                <div className="mb-3">
                                    <span
                                        className="inline-flex items-center gap-1.5 px-3 py-1 text-white text-xs font-bold uppercase tracking-widest"
                                        style={{
                                            background: `linear-gradient(135deg, ${style.borderLeft} 0%, ${style.borderBottom} 100%)`,
                                            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                                            borderRadius: "2px",
                                        }}
                                    >
                                        <BookOpen size={11} />
                                        {filiere.length} Formation{filiere.length > 1 ? 's' : ''}
                                    </span>
                                </div>

                                {/* Titre */}
                                <h3
                                    className="font-bold text-[#2D2F2B] mb-2 text-base leading-snug uppercase flex-1"
                                    style={{
                                        fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                                        letterSpacing: "0.04em",
                                    }}
                                >
                                    {ecole.title}
                                </h3>

                                {/* Description */}
                                <p
                                    className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-5"
                                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                                >
                                    {ecole.description}
                                </p>

                                {/* Lien UIJP */}
                                <span className="link-uijp inline-flex items-center gap-2 self-start">
                                    DÉCOUVRIR L'ÉCOLE
                                    <ArrowRight size={14} />
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default GridEcole;
