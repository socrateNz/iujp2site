import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { authOptions } from '@/lib/auth';

// GET - Récupérer les statistiques de visites
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

    const [totalVisits, todayVisits, weekVisits, monthVisits] = await Promise.all([
      db.collection('pageViews').countDocuments(),
      db.collection('pageViews').countDocuments({ createdAt: { $gte: startOfToday } }),
      db.collection('pageViews').countDocuments({ createdAt: { $gte: startOfWeek } }),
      db.collection('pageViews').countDocuments({ createdAt: { $gte: startOfMonth } }),
    ]);

    return NextResponse.json({
      success: true,
      data: { totalVisits, todayVisits, weekVisits, monthVisits },
    });
  } catch (error) {
    console.error('Erreur récupération visites:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST - Enregistrer une visite
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { page, userAgent, referrer } = body;

    const client = await clientPromise;
    const db = client.db();

    await db.collection('pageViews').insertOne({
      page: page || '/',
      userAgent: userAgent || '',
      referrer: referrer || '',
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur enregistrement visite:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
