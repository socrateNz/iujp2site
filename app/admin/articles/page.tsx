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
  Calendar,
  User,
  Clock
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Articles</h1>
          <p className="text-slate-500 mt-1">
            Gestion du blog et des actualités.
          </p>
        </div>
        <Link href="/admin/articles/new">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
            <Plus className="mr-2 h-4 w-4" />
            Nouvel article
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
                className="pl-10 border-slate-200"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
            >
              <option value="">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={filterPublished}
              onChange={(e) => setFilterPublished(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
            >
              <option value="">Tous les statuts</option>
              <option value="true">Publiés</option>
              <option value="false">Brouillons</option>
            </select>
            <Button onClick={fetchArticles} variant="outline" className="border-slate-200 hover:bg-slate-50">
              Actualiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des articles */}
      <Card className="border-slate-200 shadow-md">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle>Liste des Articles</CardTitle>
          <CardDescription>
            {filteredArticles.length} articles trouvés
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <div key={article._id?.toString()} className="group border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 bg-white">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full'>
                    <div className="relative overflow-hidden rounded-lg w-full sm:w-32 aspect-video bg-gray-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-500'
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{article.title}</h3>
                        <Badge variant={article.published ? 'default' : 'secondary'} className={article.published ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
                          {article.published ? 'Publié' : 'Brouillon'}
                        </Badge>
                        <Badge variant="outline" className="text-slate-500 border-slate-200">{article.category}</Badge>
                      </div>
                      <p className="text-slate-500 text-sm mb-3 line-clamp-2">{article.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {article.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-center ml-auto">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                      onClick={() => handleTogglePublished(article._id!.toString(), article.published)}
                      title={article.published ? "Dépublier" : "Publier"}
                    >
                      {article.published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <EditArticleDialog article={article} onSuccess={fetchArticles}>
                      <Button size="sm" variant="ghost" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </EditArticleDialog>

                    <ConfirmDialog message={'Êtes-vous sûr de vouloir supprimer cet article ?'} onConfirm={() => handleDeleteArticle(article._id!.toString())}>
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