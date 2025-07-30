"use client"

import FormationGrid from '@/components/Home/FormationGrid';
import Loading from '@/components/loading';
import { Ecole, Filiere } from '@/lib/types';
import React, { useEffect, useState } from 'react'

interface DetailFournClientProps {
  filiereId: string;
  initialFilieres: Filiere[];
  initialEcoles: Ecole[];
}

const DetailFourn: React.FC<DetailFournClientProps> = ({
  filiereId,
  initialFilieres,
  initialEcoles
}) => {
  const [filieres, setFilieres] = useState<Filiere[]>(initialFilieres);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ecoles, setEcoles] = useState<Ecole[]>(initialEcoles);

  useEffect(() => {
    // Optionnel: recharger les données si nécessaire
    // fetchFiliere();
    // fetchEcoles();
  }, []);

  const fetchFiliere = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/filieres');
      const data = await res.json();
      setFilieres(data.data?.filieres || []);
    } catch (err) {
      setError('Erreur lors du chargement des filières');
    } finally {
      setLoading(false);
    }
  }

  const fetchEcoles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/ecoles');
      const data = await res.json();
      setEcoles(data.data?.ecoles || []);
    } catch (err) {
      setError('Erreur lors du chargement des écoles');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;
  if (error) return <div>{"Une erreur est survenue lors du chargement des données. Veuillez recharger la page."}</div>;

  return (
    <div>
      <FormationGrid formationsList={filieres.filter((x) => x.ecoleId === filiereId)} />
    </div>
  )
}

export default DetailFourn;