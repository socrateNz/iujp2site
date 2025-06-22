import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { Article } from '@/lib/types';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import { Session } from "next-auth";
import { authOptions } from '@/lib/auth';

// GET - Récupérer la liste des articles
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) 
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Accès non autorisé' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const published = searchParams.get('published');
    const search = searchParams.get('search');

    const client = await clientPromise;
    const db = client.db();

    // Construire le filtre
    const filter: any = {};
    
    if (category) filter.category = category;
    if (published !== null) filter.published = published === 'true';
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;
    
    const articles = await db.collection('articles')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection('articles').countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: {
        articles,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Erreur récupération articles:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouvel article
export async function POST(request: NextRequest) {
  try {
    console.log("Creation de l'article...")
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Accès non autorisé' },
        { status: 401 }
      );
    }

    
    const body = await request.json();
    const { title, description, content, category, author, readTime, published, image } = body;
    
    // Validation des données
    if (!title || !description || !content || !category || !author || !readTime) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }
    console.log("Suite ...");

    const client = await clientPromise;
    const db = client.db();

    console.log("Et ici alors ...");

    let imageUrl = image || '';
    let imagePublicId = '';

    // Créer l'article
    const newArticle: Omit<Article, '_id'> = {
      title,
      description,
      content,
      image: imageUrl,
      imagePublicId,
      category,
      author,
      readTime,
      published,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: published ? new Date() : undefined,
    };
    
    const result = await db.collection('articles').insertOne(newArticle);

    return NextResponse.json({
      success: true,
      data: { ...newArticle, _id: result.insertedId },
      message: 'Article créé avec succès'
    });
  } catch (error) {
    console.error('Erreur création article:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 