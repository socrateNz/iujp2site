import Details from '@/components/Formations/Detail/Detail';
import Loading from '@/components/loading';
import { formations } from '@/data/data';
import { Filiere } from '@/lib/types';
import { Metadata } from 'next';
import React, { useEffect, useState } from 'react'
import ClientComp from './ClientComp';


export async function generateMetadata({ params }: { params: Promise<{ _id: string }> }): Promise<Metadata> {

  const { _id } = await params

  return {
    title: `Details du service ${_id}`,
  };
}

const DatailFournPage = async ({ params }: Readonly<{
  params: Promise<{ _id: string }>;
}>) => {

  const formationId = (await params)._id


  return (
    <div>
      <ClientComp formationId={formationId} />
    </div>
  )
}

export default DatailFournPage
