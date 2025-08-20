import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { Filiere } from '@/lib/types';
import { authOptions } from '@/lib/auth';

// GET - Récupérer la liste des filières
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const ecoleId = searchParams.get('ecoleId');
    const search = searchParams.get('search');

    const client = await clientPromise;
    const db = client.db();

    // Construire le filtre
    const filter: any = {};
    if (ecoleId) filter.ecoleId = ecoleId;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    // Pagination
    const skip = (page - 1) * limit;
    const filieres = await db.collection('filieres')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    const total = await db.collection('filieres').countDocuments(filter);
    return NextResponse.json({
      success: true,
      data: {
        filieres,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Erreur récupération filières:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST - Créer une nouvelle filière
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Accès non autorisé' }, { status: 401 });
    }
    const body = await request.json();
    const { title, image, description, duration, ecoleId, examen } = body;
    if (!title || !image || !description || !duration || !ecoleId) {
      return NextResponse.json({ success: false, error: 'Champs requis manquants' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const newFiliere: Omit<Filiere, '_id'> = {
      title,
      image,
      description,
      duration,
      ecoleId,
      examen: examen || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await db.collection('filieres').insertOne(newFiliere);
    return NextResponse.json({
      success: true,
      data: { ...newFiliere, _id: result.insertedId },
      message: 'Filière créée avec succès'
    });
  } catch (error) {
    console.error('Erreur création filière:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
} 