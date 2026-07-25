"use client";

import React from 'react';
import { News } from '@/data/data';
import Similaire from './Similaire';
import { useRouter } from 'next/navigation';
import ContactForm from '@/components/Home/ContactForm';
import { Calendar, ChevronLeft, Clock } from 'lucide-react';

interface Article {
    article: News;
}

function processArticleLinks(html: string): string {
    return html.replace(/<a\s/gi, '<a target="_blank" rel="noopener noreferrer" ');
}

const DetailNews = ({ article }: Article) => {
    const router = useRouter();
    const processedContent = processArticleLinks(article.content || '');

    return (
        <div className="min-h-screen" style={{ background: "#f5f6fa" }}>

            {/* ── Bannière article EEMI ── */}
            <div
                className="relative w-full overflow-hidden flex flex-col justify-end"
                style={{ height: "340px" }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${article.image})` }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(135deg, rgba(26,5,51,0.80) 0%, rgba(123,47,190,0.60) 60%, rgba(233,30,140,0.45) 100%)",
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }}
                />

                <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 pb-10 w-full">
                    {/* Retour */}
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest mb-5 transition-colors"
                        style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
                    >
                        <ChevronLeft size={14} />
                        Retour aux articles
                    </button>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span
                            className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-white"
                            style={{
                                background: "linear-gradient(135deg, #7B2FBE 0%, #E91E8C 100%)",
                                fontFamily: "var(--font-oswald), Oswald, sans-serif",
                                borderRadius: "2px",
                            }}
                        >
                            {article.category}
                        </span>
                        <span
                            className="flex items-center gap-1.5 text-white/70 text-xs"
                            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                        >
                            <Calendar size={12} />
                            {article.date}
                        </span>
                        {article.readTime && (
                            <span
                                className="flex items-center gap-1.5 text-white/70 text-xs"
                                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                            >
                                <Clock size={12} />
                                {article.readTime}
                            </span>
                        )}
                    </div>

                    {/* Titre */}
                    <h1
                        className="text-white font-black uppercase"
                        style={{
                            fontFamily: "var(--font-oswald), Oswald, sans-serif",
                            fontSize: "clamp(1.75rem, 4vw, 3rem)",
                            lineHeight: 1.05,
                            letterSpacing: "0.02em",
                            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                        }}
                    >
                        {article.title}
                    </h1>
                </div>
            </div>

            {/* ── Corps de l'article ── */}
            <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-8">

                {/* Contenu principal */}
                <div className="w-full lg:w-[68%] flex flex-col gap-6">

                    {/* Sommaire */}
                    <div
                        className="bg-white p-6"
                        style={{
                            borderLeft: "4px solid #7B2FBE",
                            borderBottom: "4px solid #E91E8C",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                            borderRadius: "2px",
                        }}
                    >
                        <h2
                            className="font-bold text-[#111111] uppercase mb-3 text-sm tracking-wider"
                            style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
                        >
                            Sommaire
                        </h2>
                        <p
                            className="text-gray-600 leading-relaxed"
                            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                        >
                            {article.description}
                        </p>
                    </div>

                    {/* Corps de l'article */}
                    <article
                        className="bg-white p-8"
                        style={{
                            borderLeft: "4px solid #E91E8C",
                            borderBottom: "4px solid #7B2FBE",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                            borderRadius: "2px",
                        }}
                    >
                        <h2
                            className="font-bold text-[#111111] uppercase mb-6 text-sm tracking-wider"
                            style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
                        >
                            Contenu de l'article
                        </h2>
                        <div
                            className="article-content text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: processedContent }}
                        />
                    </article>

                    {/* Articles similaires */}
                    <Similaire article={article} />
                </div>

                {/* ── Sidebar contact ── */}
                <aside
                    className="hidden lg:flex flex-col gap-5 lg:w-[32%] sticky top-24 h-fit bg-white p-6"
                    style={{
                        borderLeft: "4px solid #7B2FBE",
                        borderBottom: "4px solid #E91E8C",
                        boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
                        borderRadius: "2px",
                    }}
                >
                    <div>
                        <h3
                            className="font-black text-[#111111] uppercase mb-2 text-xl"
                            style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif", letterSpacing: "0.04em" }}
                        >
                            Nous Contacter
                        </h3>
                        <div
                            className="h-1 w-10 rounded-full mb-4"
                            style={{ background: "linear-gradient(90deg, #7B2FBE, #E91E8C)" }}
                        />
                        <p
                            className="text-gray-500 text-sm mb-5"
                            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                        >
                            Vous avez une question ? Remplissez le formulaire ci-dessous.
                        </p>
                    </div>
                    <ContactForm />
                </aside>
            </main>
        </div>
    );
};

export default DetailNews;
