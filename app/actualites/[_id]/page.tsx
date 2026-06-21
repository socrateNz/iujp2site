// app/actualites/[id]/page.tsx

import DetailClientWrapper from '@/components/Actualites/Details/DetailClientWrapper';
import { Metadata } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Charge l'article directement depuis MongoDB pour le SEO (côté serveur)
async function getArticle(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const article = await db.collection('articles').findOne({
      _id: new ObjectId(id),
      published: true,
    });
    return article;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ _id: string }>;
}): Promise<Metadata> {
  const { _id } = await params;
  const article = await getArticle(_id);

  if (!article) {
    return {
      title: 'Article introuvable — UIJP II',
      description: "Cet article n'existe pas ou a été supprimé.",
    };
  }

  const siteUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const articleUrl = `${siteUrl}/actualites/${_id}`;
  const description = article.description?.slice(0, 160) || '';

  return {
    title: `${article.title} — UIJP II`,
    description,
    openGraph: {
      title: article.title,
      description,
      url: articleUrl,
      siteName: 'UIJP II — Université Internationale Jean Paul II',
      type: 'article',
      publishedTime: article.publishedAt?.toISOString(),
      authors: [article.author],
      images: article.image
        ? [
            {
              url: article.image,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: article.image ? [article.image] : [],
    },
    alternates: {
      canonical: articleUrl,
    },
  };
}

const ArticleDetailPage = async ({
  params,
}: Readonly<{
  params: Promise<{ _id: string }>;
}>) => {
  return (
    <div className="pt-8">
      <DetailClientWrapper articleId={(await params)._id} />
    </div>
  );
};

export default ArticleDetailPage;
