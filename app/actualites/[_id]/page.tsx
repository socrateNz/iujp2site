// app/actualites/[id]/page.tsx

import DetailClientWrapper from '@/components/Actualites/Details/DetailClientWrapper';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ _id: string }> }): Promise<Metadata> {

  const { _id } = await params

  return {
    title: `Details du service ${_id}`,
  };
}

const DatailFournPage = async ({ params }: Readonly<{
  params: Promise<{ _id: string }>;
}>) => {
  return (
    <div className="pt-8">
      <DetailClientWrapper articleId={(await params)._id} />
    </div>
  );
};

export default DatailFournPage;
