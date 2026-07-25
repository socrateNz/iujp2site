"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ConfirmDialog from '@/components/Confirm';
import { Trash2, Edit, Plus, Search, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Loading from '@/components/loading';
import { Ecole, Filiere } from '@/lib/types';
import { toast } from 'sonner';
import EditEcoleDialog from '@/components/admin/Ecole/EditEcole';

export default function EcolesAdminPage() {
  const [ecoles, setEcoles] = useState<Ecole[]>([]);
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/ecoles').then(res => res.json()),
      fetch('/api/admin/filieres').then(res => res.json())
    ])
    .then(([ecolesData, filieresData]) => {
      setEcoles(ecolesData.data?.ecoles || []);
      setFilieres(filieresData.data?.filieres || []);
      setLoading(false);
    })
    .catch(() => {
      setError('Erreur lors du chargement des écoles');
      setLoading(false);
    });
  }, []);

  const fetchEcoles = async () => {
    fetch('/api/admin/ecoles')
      .then(res => res.json())
      .then(data => {
        setEcoles(data.data?.ecoles || []);
      });
  }

  const filteredEcoles = ecoles.filter(ecole => {
    const matchesSearch = ecole.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ecole.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredEcoles.length / itemsPerPage);
  const paginatedEcoles = filteredEcoles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDeleteEcole = async (ecoleId: string) => {
    try {
      const response = await fetch(`/api/admin/ecoles/${ecoleId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchEcoles();
        toast.success('Ecole supprimé avec succès');
      } else {
        toast.error(data.error || 'Erreur suppression ecole');
      }
    } catch (error) {
      console.error('Erreur suppression ecole:', error);
      toast.error('Erreur suppression ecole');
    }
  };

  const getFiliereCount = (ecoleId: string) => {
    return filieres.filter(f => f.ecoleId === ecoleId).length;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-widest uppercase text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Écoles</h1>
          <p className="text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Gestion des établissements et formations.
          </p>
        </div>
        <Link href="/admin/ecoles/new">
          <button className="btn-eemi flex items-center gap-2 shadow-lg shadow-[#205C03]/30 hover:shadow-[#0B30BB]/40">
            <Plus className="h-4 w-4" />
            Nouvelle école
          </button>
        </Link>
      </div>

      {/* Filtres */}
      <div className="bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]" style={{ borderLeft: "4px solid #0B30BB", borderBottom: "4px solid #205C03", borderRadius: "2px" }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 rounded-[2px] border-slate-200 focus:ring-[#205C03] focus:border-[#205C03]"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            />
          </div>
          <button onClick={fetchEcoles} className="border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-[2px] px-4 py-2 font-bold uppercase tracking-widest transition-colors" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif", fontSize: "0.875rem" }}>
            Actualiser
          </button>
        </div>
      </div>

      {/* Liste des écoles */}
      <div className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
        <div className="bg-slate-50/50 p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Liste des Écoles</h2>
          <p className="text-sm text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            {filteredEcoles.length} établissements enregistrés
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {paginatedEcoles.map((ecole) => (
              <div key={ecole._id?.toString()} className="group border border-slate-100 p-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 bg-white" style={{ borderRadius: "2px" }}>
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full'>
                    <div className="relative overflow-hidden w-full sm:w-24 aspect-square bg-slate-50 border border-slate-100" style={{ borderRadius: "2px" }}>
                      <img
                        src={ecole.image}
                        alt={ecole.title}
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-500'
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-[#111111] uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>{ecole.title}</h3>
                      <p className="text-slate-500 mb-3 text-sm line-clamp-2" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{ecole.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-bold uppercase tracking-widest bg-slate-50 p-2 w-fit" style={{ borderRadius: "2px", fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                        {ecole.directeur && <span className="flex items-center gap-1"><span className="text-slate-400">Dir.</span> {ecole.directeur}</span>}
                        {ecole.directeur && <span className="text-slate-300">|</span>}
                        <span className="text-[#0B30BB] bg-[#0B30BB]/10 px-2.5 py-1 rounded-[2px]">{getFiliereCount(ecole._id!.toString())} Filières</span>
                        <span className="text-slate-300">|</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(ecole.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center ml-auto">
                    <EditEcoleDialog ecole={ecole} onUpdate={fetchEcoles}>
                      <Button size="sm" variant="ghost" className="text-slate-500 hover:text-[#205C03] hover:bg-[#205C03]/10 rounded-[2px]">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </EditEcoleDialog>

                    <ConfirmDialog message={'Êtes-vous sûr de vouloir supprimer cette école ?'} onConfirm={() => handleDeleteEcole(ecole._id!.toString())}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-[2px]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </ConfirmDialog>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredEcoles.length === 0 && (
              <div className="text-center py-8 text-slate-500" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                Aucune école trouvée.
              </div>
            )}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-[2px]"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Précédent
              </Button>
              <span className="text-sm font-bold text-slate-600" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                Page {currentPage} sur {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-[2px]"
              >
                Suivant <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}