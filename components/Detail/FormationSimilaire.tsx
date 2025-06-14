import { Formation, formations } from '@/data/data'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface Props {
    formation: Formation
}

const FormationSimilaire = ({ formation }: Props) => {

    const allFormations = [...formations.licence, ...formations.master];
    const similaires = allFormations.filter(x => x.classe === formation.classe)
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold text-[#1B2A4A] mb-10 text-center">Formations similaires</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {similaires.map((formation, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="h-[250px] overflow-hidden">
                                <img
                                    src={formation.image}
                                    alt={formation.title}
                                    className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl font-serif text-[#1B2A4A]">{formation.title}</CardTitle>
                                    <Badge className="bg-[#D4AF37]">2 ans</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">{formation.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-[#1B2A4A] hover:bg-[#0F1A30] text-white !rounded-button whitespace-nowrap">
                                    Découvrir cette formation
                                    <i className="fas fa-arrow-right ml-2"></i>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FormationSimilaire
