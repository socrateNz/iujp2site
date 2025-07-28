import GridEcole from '@/components/Ecole/GridEcole'
import Head from '@/components/ui/head'
import { ecoles } from '@/data/data'
import React from 'react'

const Page = () => {
  return (
    <div className='py-10'>
      <Head title='Nos Ecoles' description="Nos Ecoles au service de nos etudiants et de la communauté universitaire" />
      <div className='max-w-7xl mx-auto'>
        <GridEcole ecoles={ecoles} />
      </div>
    </div>
  )
}

export default Page
