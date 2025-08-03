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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des écoles</h1>
          <p className="text-gray-600">
            Gérez les écoles et formations du site
          </p>
        </div>
        <Link href="/admin/ecoles/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle école
          </Button>
        </Link>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher une école..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={fetchEcoles} variant="outline">
              Actualiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des articles */}
      <Card>
        <CardHeader>
          <CardTitle>Ecoles ({filteredEcoles.length})</CardTitle>
          <CardDescription>
            Liste de tous les écoles du site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEcoles.map((ecole) => (
              <div key={ecole._id?.toString()} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className='flex gap-4 items-center'>
                    <img src={ecole.image} alt={ecole.title} className='max-h-22 aspect-square rounded-sm object-cover' />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{ecole.title}</h3>
                      <p className="text-gray-600 mb-2">{ecole.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {ecole.directeur && <span>Directeur: {ecole.directeur}</span>}
                        <span>•</span>
                        <span>{ecole.formation.length} Filieres</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Ajouté le
                          {new Date(ecole.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <EditEcoleDialog ecole={ecole} onUpdate={fetchEcoles}>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </EditEcoleDialog>

                    <ConfirmDialog message={'Êtes-vous sûr de vouloir supprimer cet article ?'} onConfirm={() => handleDeleteEcole(ecole._id!.toString())}>
                      <Button
                        size="sm"
                        variant="destructive"
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