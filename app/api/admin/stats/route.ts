import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { AdminStats } from '@/lib/types';
import { authOptions } from '@/lib/auth';

// GET - Récupérer les statistiques du dashboard
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Accès non autorisé' },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 7);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Récupérer les statistiques en parallèle
    const [
      totalUsers,
      totalArticles,
      publishedArticles,
      totalContacts,
      newContacts,
      totalVisits,
      todayVisits,
      weekVisits,
      monthVisits,
    ] = await Promise.all([
      db.collection('users').countDocuments(),
      db.collection('articles').countDocuments(),
      db.collection('articles').countDocuments({ published: true }),
      db.collection('contacts').countDocuments(),
      db.collection('contacts').countDocuments({ status: 'new' }),
      db.collection('pageViews').countDocuments(),
      db.collection('pageViews').countDocuments({ createdAt: { $gte: startOfToday } }),
      db.collection('pageViews').countDocuments({ createdAt: { $gte: startOfWeek } }),
      db.collection('pageViews').countDocuments({ createdAt: { $gte: startOfMonth } }),
    ]);

    const stats: AdminStats = {
      totalUsers,
      totalArticles,
      totalContacts,
      newContacts,
      publishedArticles,
      draftArticles: totalArticles - publishedArticles,
      totalVisits,
      todayVisits,
      weekVisits,
      monthVisits,
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