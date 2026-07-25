"use client";

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  User,
  Clock,
  ChevronLeft,
  ChevronRight
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Articles</h1>
          <p className="text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Gestion du blog et des actualités.
          </p>
        </div>
        <Link href="/admin/articles/new">
          <button className="btn-eemi flex items-center gap-2 shadow-lg shadow-[#205C03]/30 hover:shadow-[#0B30BB]/40">
            <Plus className="h-4 w-4" />
            Nouvel article
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
          <select
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-slate-200 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#205C03] bg-white text-sm text-slate-600"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            <option value="">Toutes les catégories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={filterPublished}
            onChange={(e) => {
              setFilterPublished(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-slate-200 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#205C03] bg-white text-sm text-slate-600"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            <option value="">Tous les statuts</option>
            <option value="true">Publiés</option>
            <option value="false">Brouillons</option>
          </select>
          <button onClick={fetchArticles} className="border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-[2px] px-4 py-2 font-bold uppercase tracking-widest transition-colors" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif", fontSize: "0.875rem" }}>
            Actualiser
          </button>
        </div>
      </div>

      {/* Liste des articles */}
      <div className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
        <div className="bg-slate-50/50 p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Liste des Articles</h2>
          <p className="text-sm text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            {filteredArticles.length} articles trouvés
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {paginatedArticles.map((article) => (
              <div key={article._id?.toString()} className="group border border-slate-100 p-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 bg-white" style={{ borderRadius: "2px" }}>
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full'>
                    <div className="relative overflow-hidden w-full sm:w-32 aspect-video bg-gray-100" style={{ borderRadius: "2px" }}>
                      <img
                        src={article.image}
                        alt={article.title}
                        className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-500'
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-[#111111] uppercase tracking-wider line-clamp-1" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>{article.title}</h3>
                        <Badge className={article.published ? "bg-[#205C03] hover:bg-[#205C03]/90 text-white rounded-[2px]" : "bg-slate-100 text-slate-600 rounded-[2px]"} style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {article.published ? 'Publié' : 'Brouillon'}
                        </Badge>
                        <Badge variant="outline" className="text-slate-500 border-slate-200 rounded-[2px]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{article.category}</Badge>
                      </div>
                      <p className="text-slate-500 text-sm mb-3 line-clamp-2" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{article.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#0B30BB] font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {article.author}</span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1 text-slate-500">
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
                      className="text-slate-500 hover:text-[#205C03] hover:bg-[#205C03]/10 rounded-[2px]"
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
                      <Button size="sm" variant="ghost" className="text-slate-500 hover:text-[#0B30BB] hover:bg-[#0B30BB]/10 rounded-[2px]">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </EditArticleDialog>

                    <ConfirmDialog message={'Êtes-vous sûr de vouloir supprimer cet article ?'} onConfirm={() => handleDeleteArticle(article._id!.toString())}>
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

            {filteredArticles.length === 0 && (
              <div className="text-center py-8 text-slate-500" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                Aucun article trouvé.
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