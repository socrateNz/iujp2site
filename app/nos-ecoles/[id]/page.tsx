import Details from '@/components/Formations/Detail/Detail';
import { formations } from '@/data/data';
import { Metadata } from 'next';
import React from 'react'


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {

  const { id } = await params

  return {
    title: `${id}`,
  };
}

const DatailFournPage = async ({ params }: Readonly<{
  params: Promise<{ id: string }>;
}>) => {
  const formationId = (await params).id;
  const allFormations = [...formations.licence, ...formations.master];
  const formation = allFormations.find((x) => x.id === Number(formationId));


  if (!formation) {
    return <div>Service introuvable</div>;
  }
  return (
    <div>
      <Details formation={formation} />
    </div>
  )
}

export default DatailFournPage
