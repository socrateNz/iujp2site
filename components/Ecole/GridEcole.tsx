import { Ecole } from '@/data/data';
import { LucideLocate, LucideLocationEdit } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface Props {
    ecoles: Ecole[];
}

const GridEcole = ({ ecoles }: Props) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10 p-10'>
            {ecoles.map((ecole, index) => (
                <Link href={ecole.url ? ecole.url : `/nos-ecole/${ecole.id}`} key={index} className="overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow border rounded-xl">
                    <div className="h-48 w-full overflow-hidden">
                        <img
                            src={ecole.logoUrl}
                            alt={ecole.nom}
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                    <div className="px-4 pt-0 flex flex-col flex-1">
                        <h3 className="font-bold text-lg mb-2">{ecole.nom}</h3>
                        <p className="text-gray-700">{ecole.description}</p>
                    </div>
                     {/* Ici je veux que tu ajoute l'adresse(adresse.ville) des differentes ecole en ajoutant aussi les icole illustrant  */}
                     <div className="flex items-center gap-2 px-4 pb-4 w-full justify-end ">
                        <span className='text-gray-600 px-2 py-1 border rounded-full'>{`+${ecole.formations.length} Formations`}</span>
                         <LucideLocationEdit size={12} />
                         <span className="text-gray-600">{ecole.adresse.ville}</span>
                     </div>
                </Link>
            ))}
        </div>
    )
}

export default GridEcole
