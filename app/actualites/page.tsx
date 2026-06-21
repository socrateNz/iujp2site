"use client"

import GridNews from '@/components/Actualites/GridNews';
import Loading from '@/components/loading';
import Head from '@/components/ui/head';
import React, { useEffect, useState, useCallback } from 'react'
import { Search, X } from 'lucide-react';

const ActualitesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce : attend 350ms après la dernière frappe
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  const fetchArticles = useCallback(async (search: string) => {
    if (search) setSearching(true);
    else setLoading(true);

    try {
      const url = `/api/admin/articles?published=true${search ? `&search=${encodeURIComponent(search)}` : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      setArticles(data.data?.articles || []);
    } catch (err) {
      console.error('Erreur chargement articles', err);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  }, []);

  // Chargement initial
  useEffect(() => {
    fetchArticles('');
  }, [fetchArticles]);

  // Recherche déclenchée par le debounce
  useEffect(() => {
    fetchArticles(debouncedQuery);
  }, [debouncedQuery, fetchArticles]);

  if (loading) return <Loading />;

  return (
    <div className='py-10'>
      <Head
        title="Toute L'actualité"
        description="Informez vous à propos de l'actualité universitaire"
      />

      <div className='max-w-7xl mx-auto px-4'>

        {/* Barre de recherche */}
        <div className="mb-8 max-w-xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un article, une catégorie…"
              className="w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-10 py-3.5 text-sm text-slate-800 placeholder-slate-400 shadow-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                aria-label="Effacer la recherche"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Résultats / état */}
          {debouncedQuery && (
            <p className="mt-2.5 text-center text-sm text-slate-500">
              {searching ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin inline-block" />
                  Recherche en cours…
                </span>
              ) : (
                <span>
                  <strong className="text-slate-700">{articles.length}</strong>{' '}
                  résultat{articles.length !== 1 ? 's' : ''} pour «{' '}
                  <span className="text-blue-600 font-medium">{debouncedQuery}</span> »
                </span>
              )}
            </p>
          )}
        </div>

        {/* Grille ou message vide */}
        {!searching && articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Search className="h-7 w-7 text-slate-400" />
            </div>
            <h2 className="text-lg font-semibold text-slate-700 mb-1">Aucun article trouvé</h2>
            <p className="text-sm text-slate-400 max-w-xs">
              Aucun article ne correspond à «{' '}
              <span className="font-medium text-slate-600">{debouncedQuery}</span> ».
              <br />Essayez un autre mot-clé.
            </p>
            <button
              onClick={() => setQuery('')}
              className="mt-5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Voir tous les articles
            </button>
          </div>
        ) : (
          <GridNews articles={articles} />
        )}
      </div>
    </div>
  )
}

export default ActualitesPage
