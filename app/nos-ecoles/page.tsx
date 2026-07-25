"use client"

import GridEcole from '@/components/Ecole/GridEcole'
import Loading from '@/components/loading'
import Head from '@/components/ui/head'
import { Ecole, Filiere } from '@/lib/types'
import React, { useEffect, useState } from 'react'

const NosEcolesPage = () => {
  const [ecoles, setEcoles] = useState<Ecole[]>([]);
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/ecoles?limit=100').then(r => r.json()),
      fetch('/api/admin/filieres?limit=100').then(r => r.json()),
    ]).then(([ecolesData, filieresData]) => {
      setEcoles(ecolesData.data?.ecoles || []);
      setFilieres(filieresData.data?.filieres || []);
      setLoading(false);
    }).catch(() => {
      setError('Erreur lors du chargement');
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
        title="Nos Écoles"
        description="Des établissements d'excellence au service de vos ambitions académiques et professionnelles."
        tag="ÉTABLISSEMENTS"
      />
      <div className='max-w-7xl mx-auto'>
        <GridEcole ecoles={ecoles} filieres={filieres} />
      </div>
    </div>
  );
}

export default NosEcolesPage
