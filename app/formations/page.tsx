"use client"

import FormationGrid from '@/components/Home/FormationGrid'
import Loading from '@/components/loading'
import Head from '@/components/ui/head'
import { formations } from '@/data/data'
import { Ecole, Filiere } from '@/lib/types'
import React, { useEffect, useState } from 'react'

const page = () => {


  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetchFiliere()
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


  if (loading) return <Loading />;
  if (error) return <div>{"Une erreur est survenue lors du chargement des données. Veuillez recharger la page."}</div>;

  return (
    <div className='mt-15'>
      <Head title='Nos Formations' description="Découvrez l'ensemble des formations que nous offrons" />
      <div className='max-w-[1400px] w-full mx-auto my-10'>
        <FormationGrid formationsList={filieres} />
      </div>
    </div>
  )
}

export default page
