import React, { Suspense } from 'react';
import CandidatureForm from '@/components/Candidature/CandidatureForm';
import Loading from '@/components/loading';

export const metadata = {
  title: 'Formulaire d\'Inscription Officiel | UIJP II Bafang',
  description: 'Postulez directement en ligne à l\'Université Internationale Jean Paul II de Bafang. Formulaire d\'admission pour ISB, FASA, ESS-ISB et Kesmond University.',
};

export default function CandidaturePage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ background: '#f5f6fa' }}>
      <Suspense fallback={<Loading />}>
        <CandidatureForm />
      </Suspense>
    </div>
  );
}
