import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { authOptions } from '@/lib/auth';

// PATCH - Mettre à jour une école
export async function PATCH(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  try {
    const id = (await params).id;
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('ecoles').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...body, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    const updatedEcole = result?.value || result;
    if (!updatedEcole) {
      return NextResponse.json({ success: false, error: "École non trouvée" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedEcole, message: "École mise à jour" });
  } catch (error) {
    console.error('Erreur mise à jour école:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE - Supprimer une école
export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Accès non autorisé' }, { status: 401 });
    }
    const id = (await params).id;
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('ecoles').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "École non trouvée" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "École supprimée" });
  } catch (error) {
    console.error('Erreur suppression école:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
} 