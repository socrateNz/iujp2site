import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Liste des candidatures avec filtres (search & status)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    const client = await clientPromise;
    const db = client.db();

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { nom: { $regex: search, $options: 'i' } },
        { prenom: { $regex: search, $options: 'i' } },
        { telephone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { filiere: { $regex: search, $options: 'i' } },
        { region: { $regex: search, $options: 'i' } },
      ];
    }

    const candidatures = await db
      .collection('candidatures')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: { candidatures },
    });
  } catch (error) {
    console.error('Erreur récupération candidatures admin:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur lors de la récupération des candidatures' },
      { status: 500 }
    );
  }
}

// PUT - Mise à jour du statut d'une candidature
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Identifiant invalide' },
        { status: 400 }
      );
    }

    const { status } = await request.json();

    if (!['new', 'in_progress', 'accepted', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Statut invalide' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('candidatures').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Candidature introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Statut de la candidature mis à jour avec succès',
    });
  } catch (error) {
    console.error('Erreur mise à jour candidature admin:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// DELETE - Suppression d'une candidature
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Identifiant invalide' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('candidatures').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Candidature introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Candidature supprimée avec succès',
    });
  } catch (error) {
    console.error('Erreur suppression candidature admin:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
