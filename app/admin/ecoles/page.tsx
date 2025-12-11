"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ConfirmDialog from '@/components/Confirm';
import { Trash2, Edit, Plus, Search, Eye, EyeOff, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Loading from '@/components/loading';
import { Ecole } from '@/lib/types';
import { toast } from 'sonner';
import EditEcoleDialog from '@/components/admin/Ecole/EditEcole';
// import { EditArticleDialog } from '@/components/admin/EditArticleDialog';


export default function EcolesAdminPage() {
  const [ecoles, setEcoles] = useState<Ecole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEcoles()
  }, []);

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

  const filteredEcoles = ecoles.filter(ecole => {
    const matchesSearch = ecole.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ecole.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch
  });

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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Écoles</h1>
          <p className="text-slate-500 mt-1">
            Gestion des établissements et formations.
          </p>
        </div>
        <Link href="/admin/ecoles/new">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle école
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
            <Button onClick={fetchEcoles} variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50">
              Actualiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des écoles */}
      <Card className="border-slate-200 shadow-md">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle>Liste des Écoles</CardTitle>
          <CardDescription>
            {filteredEcoles.length} établissements enregistrés
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredEcoles.map((ecole) => (
              <div key={ecole._id?.toString()} className="group border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 bg-white">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full'>
                    <div className="relative overflow-hidden rounded-lg w-full sm:w-24 aspect-square bg-slate-100 border border-slate-200">
                      <img
                        src={ecole.image}
                        alt={ecole.title}
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-500'
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{ecole.title}</h3>
                      <p className="text-slate-500 mb-3 text-sm line-clamp-2">{ecole.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium bg-slate-50 p-2 rounded-lg w-fit">
                        {ecole.directeur && <span className="flex items-center gap-1"><span className="text-slate-400">Dir.</span> {ecole.directeur}</span>}
                        {ecole.directeur && <span className="text-slate-300">|</span>}
                        <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{ecole.formation.length} Filières</span>
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
                      <Button size="sm" variant="ghost" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </EditEcoleDialog>

                    <ConfirmDialog message={'Êtes-vous sûr de vouloir supprimer cette école ?'} onConfirm={() => handleDeleteEcole(ecole._id!.toString())}>
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