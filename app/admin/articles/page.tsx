"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { Article } from '@/lib/types';
import Loading from '@/components/loading';
import ConfirmDialog from '@/components/Confirm';
import { toast } from 'sonner';
import { EditArticleDialog } from '@/components/admin/Article/EditArticle';

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPublished, setFilterPublished] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterCategory) params.append('category', filterCategory);
      if (filterPublished) params.append('published', filterPublished);

      const response = await fetch(`/api/admin/articles?${params}`);
      const data = await response.json();

      if (data.success) {
        setArticles(data.data.articles || data.data);
      }
    } catch (error) {
      console.error('Erreur récupération articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {

    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchArticles();
        toast.success('Article supprimé avec succès');
      } else {
        toast.error(data.error || 'Erreur suppression article');
      }
    } catch (error) {
      console.error('Erreur suppression article:', error);
      toast.error('Erreur suppression article');
    }
  };

  const handleTogglePublished = async (articleId: string, currentPublished: boolean) => {
    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !currentPublished }),
      });

      const data = await response.json();

      if (data.success) {
        fetchArticles();
      } else {
        toast.error(data.error || 'Erreur mise à jour article');
      }
    } catch (error) {
      console.error('Erreur mise à jour article:', error);
      toast.error('Erreur mise à jour article');
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || article.category === filterCategory;
    const matchesPublished = filterPublished === '' ||
      (filterPublished === 'true' && article.published) ||
      (filterPublished === 'false' && !article.published);

    return matchesSearch && matchesCategory && matchesPublished;
  });

  const categories = Array.from(new Set(articles.map(article => article.category)));

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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des articles</h1>
          <p className="text-gray-600">
            Gérez les articles et actualités du site
          </p>
        </div>
        <Link href="/admin/articles/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel article
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
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={filterPublished}
              onChange={(e) => setFilterPublished(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les statuts</option>
              <option value="true">Publiés</option>
              <option value="false">Brouillons</option>
            </select>
            <Button onClick={fetchArticles} variant="outline">
              Actualiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des articles */}
      <Card>
        <CardHeader>
          <CardTitle>Articles ({filteredArticles.length})</CardTitle>
          <CardDescription>
            Liste de tous les articles du site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <div key={article._id?.toString()} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className='flex gap-4 items-center'>
                    <img src={article.image} alt={article.title} className='max-h-22 aspect-square rounded-sm object-cover' />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{article.title}</h3>
                        <Badge variant={article.published ? 'default' : 'secondary'}>
                          {article.published ? 'Publié' : 'Brouillon'}
                        </Badge>
                        <Badge variant="outline">{article.category}</Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{article.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Par {article.author}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTogglePublished(article._id!.toString(), article.published)}
                    >
                      {article.published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <EditArticleDialog article={article} onSuccess={fetchArticles}>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </EditArticleDialog>
                    
                    <ConfirmDialog message={'Êtes-vous sûr de vouloir supprimer cet article ?'} onConfirm={() => handleDeleteArticle(article._id!.toString())}>
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