import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { Ecole } from '@/lib/types';
import { authOptions } from '@/lib/auth';

// GET - Récupérer la liste des écoles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');

    const client = await clientPromise;
    const db = client.db();

    // Construire le filtre
    const filter: any = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { directeur: { $regex: search, $options: 'i' } }
      ];
    }
    // Pagination
    const skip = (page - 1) * limit;
    const ecoles = await db.collection('ecoles')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    const total = await db.collection('ecoles').countDocuments(filter);
    return NextResponse.json({
      success: true,
      data: {
        ecoles,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Erreur récupération écoles:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST - Créer une nouvelle école
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Accès non autorisé' }, { status: 401 });
    }
    const body = await request.json();
    const { title, description, image, directeur, formation } = body;
    if (!title || !description || !image) {
      return NextResponse.json({ success: false, error: 'Champs requis manquants' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const newEcole: Omit<Ecole, '_id'> = {
      title,
      description,
      image,
      directeur,
      formation: formation || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await db.collection('ecoles').insertOne(newEcole);
    return NextResponse.json({
      success: true,
      data: { ...newEcole, _id: result.insertedId },
      message: 'École créée avec succès'
    });
  } catch (error) {
    console.error('Erreur création école:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
} 