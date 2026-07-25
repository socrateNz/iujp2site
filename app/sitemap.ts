import { MetadataRoute } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.uijpbafang.org';

  // Pages statiques principales
  const staticRoutes = [
    '',
    '/nos-ecoles',
    '/formations',
    '/actualites',
    '/contacts',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    const client = await clientPromise;
    const db = client.db();

    // Récupérer les articles dynamiques
    const articles = await db.collection('articles')
      .find({ published: true })
      .project({ _id: 1, updatedAt: 1 })
      .toArray();

    const articleRoutes = articles.map((article) => ({
      url: `${baseUrl}/actualites/${article._id.toString()}`,
      lastModified: article.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...articleRoutes];
  } catch (error) {
    console.error("Erreur génération sitemap:", error);
    return staticRoutes;
  }
}
