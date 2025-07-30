"use client";

import React, { useTransition } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';
import { Loader, LucideTimer } from 'lucide-react';
import { Filiere } from '@/lib/types';

interface Formation {
    id: number;
    title: string;
    image: string;
    description: string;
    duration: string;
    classe: string;
}

interface Props {
    formationsList: Filiere[];
}

const FormationGrid = ({formationsList}: Props) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-7">
            {formationsList.map((formation, index) => (
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
                            <Badge className="bg-[#34773D]">
                                <LucideTimer />
                                {formation.duration} ans
                                </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">{formation.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Button
                            disabled={isPending}
                            onClick={() => startTransition(
                                () => {
                                    router.push(`/formations/${formation._id}`)
                                }
                            )}
                            className="w-full bg-[#1B2A4A] hover:bg-[#0F1A30] text-white !rounded-button whitespace-nowrap">
                            {isPending && <Loader className="animate-spin mr-2" size={18} />}
                            {"Détails de la formation"}
                            <i className="fas fa-arrow-right ml-2"></i>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default FormationGrid
