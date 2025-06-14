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

interface Props {
    formation: Formation
}

const Details = ({formation}: Props) => {
    return (
        <div className="min-h-screen bg-white">
            <main className="pt-16">
                {/* Bannière de formation */}
                <section className="relative h-[400px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A4A]/90 to-[#1B2A4A]/70 z-10"></div>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://readdy.ai/api/search-image?query=A%2520prestigious%2520university%2520classroom%2520with%2520students%2520engaged%2520in%2520an%2520international%2520relations%2520lecture%252C%2520modern%2520academic%2520setting%252C%2520professor%2520at%2520podium%252C%2520world%2520map%2520on%2520wall%252C%2520elegant%2520architecture%252C%2520professional%2520lighting%252C%2520serious%2520academic%2520atmosphere&width=1440&height=400&seq=33&orientation=landscape')`
                        }}
                    ></div>

                    <div className="container mx-auto px-4 h-full flex items-center relative z-20">
                        <div className="max-w-3xl text-white">
                            <div className="flex items-center mb-4">
                                <a href="https://readdy.ai/home/b810b447-bdd3-4c3f-8f2a-b8c2991aa67d/a087413a-f905-43cf-b8f6-3797ade6f8f4" data-readdy="true" className="text-gray-200 hover:text-[#D4AF37] transition-colors cursor-pointer">
                                    <i className="fas fa-arrow-left mr-2"></i>
                                    Retour aux formations
                                </a>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{formation.title}</h1>
                            <div className="flex flex-wrap gap-3 mb-6">
                                <Badge className="bg-[#D4AF37] text-white px-3 py-1">Niveau Bac+5</Badge>
                                <Badge className="bg-white text-[#1B2A4A] px-3 py-1">{`${formation.duration}`}</Badge>
                                <Badge className="bg-[#1B2A4A] text-white border border-white px-3 py-1">Formation initiale</Badge>
                                <Badge className="bg-[#1B2A4A] text-white border border-white px-3 py-1">Formation continue</Badge>
                            </div>
                            {/* description */}
                            <p className="text-xl mb-8 font-light">F{"ormez-vous à l'analyse des enjeux géopolitiques contemporains et préparez-vous à une carrière internationale dans la diplomatie, les organisations internationales ou les entreprises multinationales."}</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="bg-[#D4AF37] hover:bg-[#B59020] text-white px-6 py-5 text-lg !rounded-button whitespace-nowrap">
                                    Candidater maintenant
                                    <i className="fas fa-user-edit ml-2"></i>
                                </Button>
                                <Button variant="outline" className="border-white text-white hover:bg-white/20 px-6 py-5 text-lg !rounded-button whitespace-nowrap">
                                    Télécharger la brochure
                                    <i className="fas fa-download ml-2"></i>
                                </Button>
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
                                        className="data-[state=active]:bg-[#D4AF37] data-[state=active]:border-[#D4AF37] data-[state=active]:text-[#1B2A4A] rounded-none h-16 px-6"
                                    >
                                        Présentation
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="debouches"
                                        className="data-[state=active]:bg-[#D4AF37] data-[state=active]:border-[#D4AF37] data-[state=active]:text-[#1B2A4A] rounded-none h-16 px-6"
                                    >
                                        Débouchés professionnels
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="admission"
                                        className="data-[state=active]:bg-[#D4AF37] data-[state=active]:border-[#D4AF37] data-[state=active]:text-[#1B2A4A] rounded-none h-16 px-6"
                                    >
                                        Admission et coûts
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            {/* Contenu des onglets */}
                            <div className="py-12">
                                {/* Présentation */}
                                <TabsContent value="presentation" className="mt-0">
                                    <Presentation />
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
