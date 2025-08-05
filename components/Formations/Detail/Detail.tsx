"use client"

// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Formation } from '@/data/data';
import Admission from './Tabs/Admission';
import Debouches from './Tabs/Debouches';
import Presentation from './Tabs/Presentation';
import Link from 'next/link';
import { Filiere } from '@/lib/types';
import { LucideTimer } from 'lucide-react';

interface Props {
    formation: Filiere | undefined
    ecole: string | undefined
}

const Details = ({ formation, ecole }: Props) => {
    return (
        <div className="min-h-screen bg-white">
            <main className="pt-16">
                {/* Bannière de formation */}
                <section className="relative h-[400px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A4A]/90 to-[#1B2A4A]/70 z-10" />
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${formation?.image})`
                        }}
                    />

                    <div className="container mx-auto px-4 h-full flex items-center relative z-20">
                        <div className="max-w-3xl text-white">
                            <div className="flex items-center mb-4">
                                <a href="https://readdy.ai/home/b810b447-bdd3-4c3f-8f2a-b8c2991aa67d/a087413a-f905-43cf-b8f6-3797ade6f8f4" data-readdy="true" className="text-gray-200 hover:text-[#34773D] transition-colors cursor-pointer">
                                    <i className="fas fa-arrow-left mr-2" />
                                    Retour aux formations
                                </a>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{formation?.title}</h1>
                            <div className="flex flex-wrap gap-3 mb-6">
                                <Badge className="bg-white text-[#1B2A4A] px-3 py-1">
                                    <LucideTimer />
                                    {`${formation?.duration} ans`}
                                </Badge>
                                {formation?.examen.map((x, i) => (
                                    <Badge key={i} className="bg-[#1B2A4A] text-white border border-white px-3 py-1">{x}</Badge>
                                ))
                                }
                            </div>
                            {/* description */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link target='_blank' href={"https://docs.google.com/forms/d/e/1FAIpQLScseIhBG54CVcHykTt43ErddcuebewPz2NLNDTd48EWsUeRag/viewform?usp=header"}>
                                    <Button className="bg-[#34773D] hover:bg-[#34773D]/80 text-white px-6 py-5 text-lg !rounded-button whitespace-nowrap">
                                        Postuler maintenant
                                        <i className="fas fa-user-edit ml-2"></i>
                                    </Button>
                                </Link>
                                <Link href="/catalogue.pdf" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="cursor-pointer text-white hover:text-white bg-[#1B2A4A]/80 hover:bg-[#1B2A4A]/30 px-8 text-lg !rounded-button whitespace-nowrap">
                                        Télécharger la brochure
                                        <i className="fas fa-download ml-2"></i>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Navigation par onglets */}
                <section className="bg-white border-b">
                    <div className="container mx-auto px-4">
                        <Tabs defaultValue="presentation" className="w-full">
                            <div className="overflow-x-auto mt-5">
                                <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-16">
                                    <TabsTrigger
                                        value="presentation"
                                        className="data-[state=active]:bg-[#34773D] data-[state=active]:border-[#34773D] data-[state=active]:text-white rounded-none h-16 px-6"
                                    >
                                        {"Présentation de nos objectifs"}
                                    </TabsTrigger>
                                    {/* <TabsTrigger
                                        value="debouches"
                                        className="data-[state=active]:bg-[#34773D] data-[state=active]:border-[#34773D] data-[state=active]:text-white rounded-none h-16 px-6"
                                    >
                                        Débouchés professionnels
                                    </TabsTrigger> */}
                                    {/* <TabsTrigger
                                        value="admission"
                                        className="data-[state=active]:bg-[#34773D] data-[state=active]:border-[#34773D] data-[state=active]:text-white rounded-none h-16 px-6"
                                    >
                                        Admission et coûts
                                    </TabsTrigger> */}
                                </TabsList>
                            </div>

                            {/* Contenu des onglets */}
                            <div className="py-12">
                                {/* Présentation */}
                                <TabsContent value="presentation" className="mt-0">
                                    <Presentation formation={formation} ecole={ecole} />
                                </TabsContent>

                                {/* Débouchés professionnels */}
                                <TabsContent value="debouches" className="mt-0">
                                    <Debouches />
                                </TabsContent>

                                {/* Admission et coûts */}
                                <TabsContent value="admission" className="mt-0">
                                    <Admission />
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </section>

                {/* Formations similaires */}

            </main>
        </div>
    );
}

export default Details;
