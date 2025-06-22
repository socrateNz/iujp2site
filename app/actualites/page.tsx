"use client"

import GridNews from '@/components/Actualites/GridNews';
import Loading from '@/components/loading';
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
    <div className='max-w-7xl mx-auto py-10'>
      <GridNews articles={articles} />
    </div>
  )
}

export default page
