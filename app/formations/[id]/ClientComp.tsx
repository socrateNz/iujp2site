"use client"

import Details from '@/components/Formations/Detail/Detail';
import Loading from '@/components/loading';
import { Ecole, Filiere } from '@/lib/types';
import React, { useEffect, useState } from 'react'

const ClientComp = ({formationId}: {formationId: string}) => {
    
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [ecoles, setEcoles] = useState<Ecole[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


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
        setError('Erreur lors du chargement des ecoles');
        setLoading(false);
      });
  }


  if (loading) return <Loading />;
  if (error) return <div>{"Une erreur est survenue lors du chargement des données. Veuillez recharger la page."}</div>;


  // const formation = filieres.find((x) => x._id === Number(formationId));
  const formation = filieres.find((x) => x._id?.toString() === formationId);
  const ecole = ecoles.find(x => x._id?.toString() === formation?.ecoleId)

  return (
    <div>
      <Details formation={formation} ecole={ecole?.title} />
    </div>
  )
}

export default ClientComp
