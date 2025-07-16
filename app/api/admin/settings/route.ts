import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { authOptions } from '@/lib/auth';

// GET : Récupérer les paramètres globaux du site
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Accès non autorisé' }, { status: 401 });
    }
    const client = await clientPromise;
    const db = client.db();
    const settings = await db.collection('site_settings').findOne({ key: 'site' });
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('Erreur récupération paramètres site:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST : Modifier les paramètres globaux du site
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Accès non autorisé' }, { status: 401 });
    }
    const {
      siteName,
      description,
      contactEmail,
      logoUrl,
      social,
      mainColor,
      address,
      phone,
      footer,
      bannerText
    } = await request.json();
    if (!siteName || !contactEmail) {
      return NextResponse.json({ success: false, error: 'Nom du site et email de contact requis' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    await db.collection('site_settings').updateOne(
      { key: 'site' },
      {
        $set: {
          siteName,
          description,
          contactEmail,
          logoUrl,
          social,
          mainColor,
          address,
          phone,
          footer,
          bannerText,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );
    return NextResponse.json({ success: true, message: 'Paramètres du site enregistrés' });
  } catch (error) {
    console.error('Erreur modification paramètres site:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
} 