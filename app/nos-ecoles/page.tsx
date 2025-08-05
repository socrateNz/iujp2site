"use client"

import GridEcole from '@/components/Ecole/GridEcole'
import Loading from '@/components/loading'
import Head from '@/components/ui/head'
import { Ecole, Filiere } from '@/lib/types'
import React, { useEffect, useState } from 'react'

const Page = () => {


  const [ecoles, setEcoles] = useState<Ecole[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingFiliere, setLoadingFiliere] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorFiliere, setErrorFiliere] = useState<string | null>(null);
   const [filieres, setFilieres] = useState<Filiere[]>([]);

  useEffect(() => {
    fetchEcoles()
    fetchFiliere()
  }, [])

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

  const fetchFiliere = async () => {
    fetch('/api/admin/filieres')
      .then(res => res.json())
      .then(data => {
        setFilieres(data.data?.filieres || []);
        setLoadingFiliere(false);
      })
      .catch(() => {
        setErrorFiliere('Erreur lors du chargement des filières');
        setLoadingFiliere(false);
      });
  }

  if (loading || loadingFiliere) return <Loading />;
  if (error || errorFiliere) return <div>{"Une erreur est survenue lors du chargement des données. Veuillez recharger la page."}</div>;

  return (
    <div className='py-10'>
      <Head title='Nos Ecoles' description="Nos Ecoles au service de nos etudiants et de la communauté universitaire" />
      <div className='max-w-7xl mx-auto'>
        <GridEcole ecoles={ecoles} filieres={filieres} />
      </div>
    </div>
  )
}

export default Page
