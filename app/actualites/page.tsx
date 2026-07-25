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

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 350);
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

  useEffect(() => { fetchArticles(''); }, [fetchArticles]);
  useEffect(() => { fetchArticles(debouncedQuery); }, [debouncedQuery, fetchArticles]);

  if (loading) return <Loading />;

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>
      <Head
        title="Actualités"
        description="Restez informés des dernières nouvelles, événements et réalisations de notre communauté universitaire."
        tag="VIE UNIVERSITAIRE"
      />

      <div className='max-w-7xl mx-auto px-4 md:px-8 py-10'>

        {/* ── Barre de recherche EEMI ── */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors"
              style={{ color: "#205C03" }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un article, une catégorie…"
              className="w-full bg-white pl-11 pr-10 py-4 text-sm text-[#111111] placeholder-gray-400 outline-none transition-all"
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                border: "2px solid #e5e7eb",
                borderRadius: "2px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#205C03"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#205C03] transition-colors"
                aria-label="Effacer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Résultats */}
          {debouncedQuery && (
            <p
              className="mt-3 text-center text-sm text-gray-500"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              {searching ? (
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-3.5 w-3.5 rounded-full border-2 border-t-transparent animate-spin inline-block"
                    style={{ borderColor: "#205C03", borderTopColor: "transparent" }}
                  />
                  Recherche en cours…
                </span>
              ) : (
                <span>
                  <strong className="text-[#111111]">{articles.length}</strong>{' '}
                  résultat{articles.length !== 1 ? 's' : ''} pour «{' '}
                  <span style={{ color: "#205C03", fontWeight: 600 }}>{debouncedQuery}</span> »
                </span>
              )}
            </p>
          )}
        </div>

        {/* Grille ou état vide */}
        {!searching && articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div
              className="w-16 h-16 flex items-center justify-center mb-5"
              style={{
                background: "linear-gradient(135deg, #205C03 0%, #0B30BB 100%)",
                borderRadius: "2px",
              }}
            >
              <Search className="h-7 w-7 text-white" />
            </div>
            <h2
              className="font-bold text-[#2D2F2B] mb-2 uppercase"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", fontSize: "1.25rem" }}
            >
              Aucun article trouvé
            </h2>
            <p
              className="text-sm text-gray-500 max-w-xs mb-6"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Aucun article ne correspond à «{' '}
              <span className="font-medium text-[#111111]">{debouncedQuery}</span> ».
              <br />Essayez un autre mot-clé.
            </p>
            <button
              onClick={() => setQuery('')}
              className="btn-uijp-outline-dark"
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
