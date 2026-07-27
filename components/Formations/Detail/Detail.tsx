"use client"

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Admission from './Tabs/Admission';
import Debouches from './Tabs/Debouches';
import Presentation from './Tabs/Presentation';
import Link from 'next/link';
import { Filiere } from '@/lib/types';
import { Clock, Download, Send, ChevronLeft } from 'lucide-react';

interface Props {
    formation: Filiere | undefined;
    ecole: string | undefined;
}

const Details = ({ formation, ecole }: Props) => {
    return (
        <div className="min-h-screen" style={{ background: "#f5f6fa" }}>

            {/* ── Bannière formation UIJP ── */}
            <div
                className="relative w-full overflow-hidden flex flex-col justify-end"
                style={{ minHeight: "380px" }}
            >
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${formation?.image})` }}
                />
                {/* Overlay dégradé UIJP */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(135deg, rgba(32,92,3,0.85) 0%, rgba(11,48,187,0.65) 100%)",
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                    }}
                />

                {/* Contenu */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-12 pt-8 w-full">
                    {/* Retour */}
                    <Link
                        href="/formations"
                        className="inline-flex items-center gap-2 text-white/75 hover:text-white text-xs font-bold uppercase tracking-widest mb-6 transition-colors"
                        style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
                    >
                        <ChevronLeft size={14} />
                        Retour aux formations
                    </Link>

                    {/* Badges durée + examens */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white bg-white/15 backdrop-blur-sm border border-white/25"
                            style={{
                                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                                borderRadius: "2px",
                            }}
                        >
                            <Clock size={11} />
                            {formation?.duration} an{Number(formation?.duration) > 1 ? 's' : ''}
                        </span>
                        {formation?.examen.map((x, i) => (
                            <span
                                key={i}
                                className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white bg-white/15 backdrop-blur-sm border border-white/25"
                                style={{
                                    fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                                    borderRadius: "2px",
                                }}
                            >
                                {x}
                            </span>
                        ))}
                    </div>

                    {/* Titre */}
                    <h1
                        className="text-white font-black uppercase mb-6 font-oswald"
                        style={{
                            fontFamily: "var(--font-oswald), Oswald, sans-serif",
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            lineHeight: 1.05,
                            letterSpacing: "0.03em",
                            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                            maxWidth: "800px",
                        }}
                    >
                        {formation?.title}
                    </h1>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href={`/candidature?filiere=${encodeURIComponent(formation?.title || '')}`}
                            className="btn-uijp text-sm"
                        >
                            <Send size={14} />
                            Postuler maintenant
                        </Link>
                        <Link
                            href="/catalogue.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-uijp-outline text-sm"
                        >
                            <Download size={14} />
                            Télécharger la brochure
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Onglets de contenu ── */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <Tabs defaultValue="presentation" className="w-full">
                    <TabsList
                        className="bg-transparent h-auto flex flex-wrap gap-2 mb-10 p-0 justify-start"
                    >
                        {[
                            { value: "presentation", label: "Présentation des objectifs" },
                            // { value: "debouches", label: "Débouchés professionnels" },
                            // { value: "admission", label: "Admission et coûts" },
                        ].map(({ value, label }) => (
                            <TabsTrigger
                                key={value}
                                value={value}
                                className="rounded-none border-2 border-[#2D2F2B] text-[#2D2F2B] font-bold text-xs uppercase tracking-widest px-5 py-2.5
                                    data-[state=active]:bg-[#205C03] data-[state=active]:text-white data-[state=active]:border-[#205C03] data-[state=active]:shadow-none
                                    hover:border-[#205C03] hover:text-[#205C03] transition-all duration-200"
                                style={{
                                    fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                                }}
                            >
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="presentation">
                        <div
                            className="bg-white p-8"
                            style={{
                                borderLeft: "4px solid #205C03",
                                borderBottom: "4px solid #0B30BB",
                                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                                borderRadius: "2px",
                            }}
                        >
                            <Presentation formation={formation} ecole={ecole} />
                        </div>
                    </TabsContent>
                    <TabsContent value="debouches">
                        <div className="bg-white p-8" style={{ borderLeft: "4px solid #0B30BB", borderBottom: "4px solid #205C03", borderRadius: "2px" }}>
                            <Debouches />
                        </div>
                    </TabsContent>
                    <TabsContent value="admission">
                        <div className="bg-white p-8" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #E3A402", borderRadius: "2px" }}>
                            <Admission />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default Details;
