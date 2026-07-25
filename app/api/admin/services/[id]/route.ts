import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();
    const { name, email, description } = data;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'ID invalide' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const updateData = {
      name,
      email,
      description,
      updatedAt: new Date(),
    };

    const result = await db.collection('services').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Service non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Service mis à jour avec succès' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 });
    }

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'ID invalide' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('services').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Service non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Service supprimé avec succès' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 });
    }

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'ID invalide' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const service = await db.collection('services').findOne({ _id: new ObjectId(id) });

    if (!service) {
      return NextResponse.json({ success: false, error: 'Service non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
