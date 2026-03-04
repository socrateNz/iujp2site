import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { authOptions } from '@/lib/auth';
import { deleteImage } from '@/lib/cloudinary';

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

    // On récupère d'abord l'article pour connaître l'URL de l'image
    const article = await db.collection('articles').findOne({ _id: new ObjectId(id) });

    if (!article) {
      return NextResponse.json({ success: false, error: "Article non trouvé" }, { status: 404 });
    }

    // Si une image est associée, on tente de la supprimer de Cloudinary
    const imageUrl = (article as any).image as string | undefined;
    if (imageUrl && typeof imageUrl === 'string') {
      try {
        const uploadIndex = imageUrl.indexOf('/upload/');
        if (uploadIndex !== -1) {
          const publicIdWithVersion = imageUrl.substring(uploadIndex + '/upload/'.length);
          const publicId = publicIdWithVersion
            .replace(/^v\d+\//, '')
            .replace(/\.[a-zA-Z0-9]+$/, '');

          await deleteImage(publicId);
        }
      } catch (err) {
        console.error('Erreur suppression image article (non bloquant):', err);
      }
    }

    // Puis on supprime l'article en base
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