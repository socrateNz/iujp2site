import DetailNews from '@/components/Actualites/Details/DatailNews';
import Details from '@/components/Formations/Detail/Detail';
import { formations, news } from '@/data/data';
import { Metadata } from 'next';
import React from 'react'


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {

  const { id } = await params

  return {
    title: `Details de l'actualité ${id}`,
  };
}

const DatailFournPage = async ({ params }: Readonly<{
  params: Promise<{ id: string }>;
}>) => {
  const articleId = (await params).id;
  const article = news.find((x) => x.id === Number(articleId));


  if (!article) {
    return <div>Actualité introuvable</div>;
  }
  return (
    <div className='pt-8'>
      <DetailNews article={article} />
    </div>
  )
}

export default DatailFournPage
