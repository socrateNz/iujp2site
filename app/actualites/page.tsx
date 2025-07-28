"use client"

import GridNews from '@/components/Actualites/GridNews';
import Loading from '@/components/loading';
import Head from '@/components/ui/head';
import React, { useEffect, useState } from 'react'

const page = () => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch('/api/admin/articles?published=true');
      const data = await res.json();
      setArticles(data.data.articles);
    };

    fetchArticles();
    setLoading(false)
  }, []);

  if (loading || articles.length <= 0) {
    return (
      <Loading />
    );
  }

  return (
    <div className='py-10'>
      <Head title="Toute L'actualité" description="Informez vous a propos de l'actualité universitaire" />
      <div className='max-w-7xl mx-auto'>
        <GridNews articles={articles} />
      </div>
    </div>
  )
}

export default page
