"use client"

import FormationGrid from '@/components/Home/FormationGrid';
import Loading from '@/components/loading';
import Head from '@/components/ui/head';
import { Ecole, Filiere } from '@/lib/types';
import React, { useEffect, useState } from 'react'



const Client = ({ filiereId }: { filiereId: string }) => {

    const [filieres, setFilieres] = useState<Filiere[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ecoles, setEcoles] = useState<Ecole[]>([]);


    useEffect(() => {
        fetchFiliere()
        fetchEcoles()
    }, []);

    const fetchFiliere = async () => {
        fetch('/api/admin/filieres')
            .then(res => res.json())
            .then(data => {
                setFilieres(data.data?.filieres || []);
                setLoading(false);
            })
            .catch(() => {
                setError('Erreur lors du chargement des filières');
                setLoading(false);
            });
    }

    const fetchEcoles = async () => {
        fetch('/api/admin/ecoles')
            .then(res => res.json())
            .then(data => {
                setEcoles(data.data?.ecoles || []);
                setLoading(false);
            })
            .catch(() => {
                setError('Erreur lors du chargement des écoles');
                setLoading(false);
            });
    }

    if (loading) return <Loading />;
    if (error) return <div>{"Une erreur est survenue lors du chargement des données. Veuillez recharger la page."}</div>;

    const ecole = ecoles.find((x) => x._id?.toString() === filiereId);

    return (
        <div className='mt-15 flex flex-col items-center'>
            <Head title={ecole?.title} description={ecole?.description} />
            <div className='max-w-[1400px] w-full flex flex-col my-10 gap-10'>
                <div className='flex flex-col md:flex-row mx-7 gap-3 items-center'>
                    <img src={ecole?.image} alt={ecole?.title} className='max-w-[200px] w-full h-auto aspect-square object-cover' />
                    <div className='flex flex-col'>
                        {ecole?.description.replace(/\\n/g, '\b').split('\n').map((line, index) => (
                            // <p key={index} className='mt-2 text-lg'>{line}</p>
                            <p key={index} className='mt-2 text-lg ' style={{ whiteSpace: 'pre-line' }}>{line || "Bienvenue à l'Institut Universitaire Jean-Paul II, votre destination pour une éducation de qualité."}</p>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col gap-5 border-t pt-10'>
                    <h2 className='text-3xl font-bold uppercase'>Formations</h2>
                    <FormationGrid formationsList={filieres.filter((x) => x.ecoleId === filiereId)} />
                </div>
            </div>
        </div>
    )
}

export default Client
