import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { ContactMessage, ApiResponse } from '@/lib/types';
import { sendAdminReply } from '@/lib/sendMail';
import { authOptions } from '@/lib/auth';

// GET - Récupérer la liste des messages de contact
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Accès non autorisé' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const client = await clientPromise;
    const db = client.db();

    // Construire le filtre
    const filter: any = {};
    
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;
    
    const contacts = await db.collection('contacts')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection('contacts').countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Erreur récupération contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST - Répondre à un message de contact
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Accès non autorisé' },
        { status: 401 }
      );
    }

    const { messageId, replyMessage, adminName } = await request.json();

    // Validation des données
    if (!messageId || !replyMessage || !adminName) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Récupérer le message original
    const originalMessage = await db.collection('contacts').findOne({
      _id: new ObjectId(messageId)
    });

    if (!originalMessage) {
      return NextResponse.json(
        { success: false, error: 'Message non trouvé' },
        { status: 404 }
      );
    }

    // Envoyer l'email de réponse
    const emailResult = await sendAdminReply({
      to: originalMessage.email,
      subject: originalMessage.subject,
      message: replyMessage,
      adminName
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, error: 'Erreur envoi email' },
        { status: 500 }
      );
    }

    // Mettre à jour le message dans la base de données
    await db.collection('contacts').updateOne(
      { _id: new ObjectId(messageId) },
      {
        $set: {
          status: 'replied',
          replyMessage,
          adminName,
          repliedAt: new Date(),
          updatedAt: new Date()
        }
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Réponse envoyée avec succès'
    });
  } catch (error) {
    console.error('Erreur réponse contact:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 