"use client"

import FormationGrid from '@/components/Home/FormationGrid'
import Loading from '@/components/loading'
import Head from '@/components/ui/head'
import { Filiere } from '@/lib/types'
import React, { useEffect, useState } from 'react'

const FormationsPage = () => {
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/filieres?limit=100')
      .then(res => res.json())
      .then(data => {
        setFilieres(data.data?.filieres || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors du chargement des filières');
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error) return (
    <div className="py-24 text-center text-gray-500" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
      Une erreur est survenue. Veuillez recharger la page.
    </div>
  );

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>
      <Head
        title="Nos Formations"
        description="Découvrez l'ensemble des programmes académiques conçus pour préparer votre avenir professionnel."
        tag="PROGRAMME ACADÉMIQUE"
      />
      <div className='max-w-7xl w-full mx-auto py-10'>
        <FormationGrid formationsList={filieres} />
      </div>
    </div>
  )
}

export default FormationsPage
