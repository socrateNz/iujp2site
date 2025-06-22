// components/Actualites/Details/DetailClientWrapper.tsx

"use client";

import React, { useEffect, useState } from 'react';
import DetailNews from './DatailNews'; // ou ton chemin exact
import { News } from '@/data/data';
import Loading from '@/components/loading';

const DetailClientWrapper = ({ articleId }: { articleId: string }) => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/admin/articles?published=true');
        const data = await res.json();
        setNews(data.data.articles);
      } catch (err) {
        console.error('Erreur lors du chargement des articles', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);
  

  if (loading) {
    return (
      <Loading />
    );
  }

  console.log(articleId);
  const article = news.find((x) => x._id === articleId);
  if (!article) return <div>Actualité introuvable</div>;


  return <DetailNews article={article} />;
};

export default DetailClientWrapper;
