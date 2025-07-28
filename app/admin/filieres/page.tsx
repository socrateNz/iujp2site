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
import { Filiere } from '@/lib/types';


export default function FilieresAdminPage() {
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredFiliere = filieres.filter(filiere => {
    const matchesSearch = filiere.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      filiere.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch 
  });

  const handleDeleteFiliere = async (filiereId: string) => {

    try {
      const response = await fetch(`/api/admin/filiere/${filiereId}`, {
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des filières</h1>
          <p className="text-gray-600">
            Gérez les filières du site
          </p>
        </div>
        <Link href="/admin/filieres/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle filière
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
            <Button onClick={fetchFiliere} variant="outline">
              Actualiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des articles */}
      <Card>
        <CardHeader>
          <CardTitle>Filières ({filteredFiliere.length})</CardTitle>
          <CardDescription>
            Liste de tous les filières du site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFiliere.map((filiere) => (
              <div key={filiere._id?.toString()} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className='flex gap-4 items-center'>
                    <img src={filiere.image} alt={filiere.title} className='max-h-22 aspect-square rounded-sm object-cover' />
                    <div className="flex-1">

                      <p className="text-gray-600 mb-2">{filiere.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {/* <EditArticleDialog article={article} onSuccess={fetchArticles}>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </EditArticleDialog> */}

                    <ConfirmDialog message={'Êtes-vous sûr de vouloir supprimer cet article ?'} onConfirm={() => handleDeleteFiliere(filiere._id!.toString())}>
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