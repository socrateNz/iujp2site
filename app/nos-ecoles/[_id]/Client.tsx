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
            <div className='max-w-[1400px] w-full mx-auto my-10'>
                <FormationGrid formationsList={filieres.filter((x) => x.ecoleId === filiereId)} />
            </div>
        </div>
    )
}

export default Client
