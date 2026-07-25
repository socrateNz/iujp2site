import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const services = await db.collection('services').find().sort({ name: 1 }).toArray();
    
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
