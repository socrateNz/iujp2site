import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();
    
    const services = await db.collection('services').find().sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 });
    }

    const data = await request.json();
    const { name, email, description } = data;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Le nom et l\'email sont requis' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const newService = {
      name,
      email,
      description: description || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('services').insertOne(newService);

    return NextResponse.json({
      success: true,
      message: 'Service créé avec succès',
      data: { ...newService, _id: result.insertedId }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
