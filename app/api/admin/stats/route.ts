import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { AdminStats } from '@/lib/types';

// GET - Récupérer les statistiques du dashboard
export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Accès non autorisé' },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Récupérer les statistiques en parallèle
    const [
      totalUsers,
      totalArticles,
      publishedArticles,
      totalContacts,
      newContacts
    ] = await Promise.all([
      db.collection('users').countDocuments(),
      db.collection('articles').countDocuments(),
      db.collection('articles').countDocuments({ published: true }),
      db.collection('contacts').countDocuments(),
      db.collection('contacts').countDocuments({ status: 'new' })
    ]);

    const stats: AdminStats = {
      totalUsers,
      totalArticles,
      totalContacts,
      newContacts,
      publishedArticles,
      draftArticles: totalArticles - publishedArticles
    };

    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Erreur récupération statistiques:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 