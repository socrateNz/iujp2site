"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Loading from '@/components/loading';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ConfirmDialog from '@/components/Confirm';
import { Trash2, Edit, Plus, Search, Eye, EyeOff, Calendar } from 'lucide-react';
import { Ecole, Filiere } from '@/lib/types';
import EditFiliereDialog from '@/components/admin/Filiere/EditFiliere';


export default function FilieresAdminPage() {
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredFiliere = filieres.filter(filiere => {
    const matchesSearch = filiere.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      filiere.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch
  });

  const handleDeleteFiliere = async (filiereId: string) => {

    try {
      const response = await fetch(`/api/admin/filieres/${filiereId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchFiliere();
        toast.success('Filière supprimé avec succès');
      } else {
        toast.error(data.error || 'Erreur suppression filière');
      }
    } catch (error) {
      console.error('Erreur suppression filière:', error);
      toast.error('Erreur suppression filière');
    }
  };

  if (loading) {
    return (
      <Loading />
    );
  }



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Filières</h1>
          <p className="text-slate-500 mt-1">
            Gestion des programmes académiques.
          </p>
        </div>
        <Link href="/admin/filieres/new">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle filière
          </Button>
        </Link>
      </div>

      {/* Filtres */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-200 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Button onClick={fetchFiliere} variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50">
              Actualiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des filières */}
      <Card className="border-slate-200 shadow-md">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle>Liste des Filières</CardTitle>
          <CardDescription>
            {filteredFiliere.length} programmes disponibles
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredFiliere.map((filiere) => (
              <div key={filiere._id?.toString()} className="group border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 bg-white">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full'>
                    <div className="relative overflow-hidden rounded-lg w-full sm:w-24 aspect-square bg-slate-100 border border-slate-200">
                      <img
                        src={filiere.image}
                        alt={filiere.title}
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-500'
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold text-slate-900 mb-1">{filiere.title}</h2>
                      <p className="text-slate-500 mb-3 text-sm line-clamp-2">{filiere.description}</p>

                      <div className='flex flex-wrap items-center gap-2 text-xs font-medium'>
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100">
                          {filiere.duration} {filiere.duration > 1 ? 'ans' : 'an'}
                        </span>
                        {filiere.examen?.map((exam, idx) => (
                          <span key={idx} className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md border border-purple-100">{exam}</span>
                        ))}
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-600 font-semibold">{
                          ecoles.find(ecole => ecole._id?.toString() === filiere.ecoleId)?.title}</span>
                        <span className="ml-auto sm:ml-0 text-slate-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(filiere.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center ml-auto">
                    <EditFiliereDialog filiere={filiere} onUpdate={fetchFiliere} >
                      <Button size="sm" variant="ghost" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </EditFiliereDialog>

                    <ConfirmDialog message={'Êtes-vous sûr de vouloir supprimer cette filière ?'} onConfirm={() => handleDeleteFiliere(filiere._id!.toString())}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-slate-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </ConfirmDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 