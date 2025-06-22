import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { authOptions } from '@/lib/auth';

// PATCH - Mettre à jour un article
export async function PATCH(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Accès non autorisé' }, { status: 401 });
    }
    const id = (await params).id;
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('articles').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: body, $currentDate: { updatedAt: true } },
      { returnDocument: "after" }
    );

    const updatedArticle = result?.value || result;

    if (!updatedArticle) {
      return NextResponse.json({ success: false, error: "Article non trouvé" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedArticle, message: "Article mis à jour" });
  } catch (error) {
    console.error('Erreur mise à jour article:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE - Supprimer un article
export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Accès non autorisé' }, { status: 401 });
    }
    const id = (await params).id;
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('articles').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Article non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Article supprimé" });
  } catch (error) {
    console.error('Erreur suppression article:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
} 