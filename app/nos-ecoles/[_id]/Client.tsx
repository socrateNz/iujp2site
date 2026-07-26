"use client"

import FormationGrid from '@/components/Home/FormationGrid';
import Loading from '@/components/loading';
import Head from '@/components/ui/head';
import { Ecole, Filiere } from '@/lib/types';
import React, { useEffect, useState } from 'react'
import { ChevronLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Client = ({ filiereId }: { filiereId: string }) => {
    const [filieres, setFilieres] = useState<Filiere[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ecoles, setEcoles] = useState<Ecole[]>([]);

    useEffect(() => {
        Promise.all([
            fetch('/api/admin/filieres?limit=100').then(r => r.json()),
            fetch('/api/admin/ecoles?limit=100').then(r => r.json()),
        ]).then(([fData, eData]) => {
            setFilieres(fData.data?.filieres || []);
            setEcoles(eData.data?.ecoles || []);
            setLoading(false);
        }).catch(() => {
            setError('Erreur lors du chargement');
            setLoading(false);
        });
    }, []);

    if (loading) return <Loading />;
    if (error) return (
        <div className="py-24 text-center text-gray-500" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Une erreur est survenue. Veuillez recharger la page.
        </div>
    );

    const ecole = ecoles.find((x) => x._id?.toString() === filiereId);
    const ecoleFormations = filieres.filter((x) => x.ecoleId === filiereId);

    return (
        <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>
            {/* ── Bannière UIJP ── */}
            <Head
                title={ecole?.title}
                description="Découvrez cet établissement d'excellence et ses formations disponibles."
                tag="NOS ÉCOLES"
            />

            <div className='max-w-7xl w-full mx-auto px-4 md:px-8 py-12'>

                {/* Lien retour */}
                <Link
                    href="/nos-ecoles"
                    className="inline-flex items-center gap-2 mb-8 link-uijp"
                >
                    <ChevronLeft size={14} />
                    Retour aux écoles
                </Link>

                {/* ── Présentation de l'école ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div
                        className="bg-white flex flex-col md:flex-row gap-8 p-8"
                        style={{
                            borderLeft: "4px solid #205C03",
                            borderBottom: "4px solid #0B30BB",
                            boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
                            borderRadius: "2px",
                        }}
                    >
                        {/* Image */}
                        {ecole?.image && (
                            <div
                                className="shrink-0 overflow-hidden"
                                style={{
                                    width: "220px",
                                    height: "220px",
                                    borderLeft: "3px solid #0B30BB",
                                    borderBottom: "3px solid #205C03",
                                    borderRadius: "2px",
                                }}
                            >
                                <img
                                    src={ecole.image}
                                    alt={ecole.title}
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        )}

                        {/* Texte */}
                        <div className="flex flex-col justify-center">
                            <h2
                                className="font-black uppercase mb-4"
                                style={{
                                    fontFamily: "var(--font-oswald), Oswald, sans-serif",
                                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                                    letterSpacing: "0.03em",
                                    color: "#2D2F2B",
                                }}
                            >
                                {ecole?.title}
                            </h2>
                            <div
                                className="h-1 w-12 rounded-full mb-5"
                                style={{ background: "linear-gradient(90deg, #205C03, #0B30BB)" }}
                            />
                            <div
                                className="text-gray-600 leading-relaxed"
                                style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "0.95rem" }}
                            >
                                {ecole?.description.replace(/\\n/g, '\b').split('\n').map((line, i) => (
                                    <p key={i} className="mb-2" style={{ whiteSpace: 'pre-line' }}>
                                        {line || "Bienvenue dans cet établissement d'excellence."}
                                    </p>
                                ))}
                            </div>

                            {/* Badge nb formations */}
                            <div className="mt-5">
                                <span
                                    className="inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-bold uppercase tracking-widest"
                                    style={{
                                        background: "linear-gradient(135deg, #205C03 0%, #0B30BB 100%)",
                                        fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                                        borderRadius: "2px",
                                    }}
                                >
                                    <BookOpen size={14} />
                                    {ecoleFormations.length} Formation{ecoleFormations.length > 1 ? 's' : ''} disponible{ecoleFormations.length > 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Formations de cette école ── */}
                {ecoleFormations.length > 0 && (
                    <div>
                        <div className="mb-8">
                            <h2
                                className="font-black uppercase"
                                style={{
                                    fontFamily: "var(--font-oswald), Oswald, sans-serif",
                                    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                                    letterSpacing: "0.03em",
                                    color: "#2D2F2B",
                                }}
                            >
                                Formations
                                <span
                                    className="block"
                                    style={{
                                        background: "linear-gradient(135deg, #205C03 0%, #0B30BB 100%)",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    disponibles
                                </span>
                            </h2>
                            <div
                                className="mt-2 h-1 w-12 rounded-full"
                                style={{ background: "linear-gradient(90deg, #205C03, #0B30BB)" }}
                            />
                        </div>
                        <FormationGrid formationsList={ecoleFormations} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Client
