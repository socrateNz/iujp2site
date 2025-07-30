import { Metadata } from 'next';
import React from 'react'
import Client from './Client';


export async function generateMetadata({ params }: { params: Promise<{ _id: string }> }): Promise<Metadata> {

  const { _id } = await params

  return {
    title: `${_id}`,
  };
}

const DatailFournPage = async ({ params }: Readonly<{
  params: Promise<{ _id: string }>;
}>) => {
  
  const filiereId = (await params)._id;

  return (
    <div>
      <Client filiereId={filiereId} />
    </div>
  )
}

export default DatailFournPage
