"use client"

import FormationGrid from '@/components/Home/FormationGrid'
import Head from '@/components/ui/head'
import { formations } from '@/data/data'
import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'

const page = () => {


  const allFormations = [
    ...formations.licence,
    ...formations.master,
    ...formations.bts
  ];

  return (
    <div className='mt-15'>
      <Head title='Nos Formations' description="Découvrez l'ensemble des formations que nous offrons" />
      <div className='max-w-[1400px] w-full mx-auto my-10'>
        <FormationGrid formationsList={allFormations} />
      </div>
    </div>
  )
}

export default page
