import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { CreateContactData, ContactMessage } from '@/lib/types';
import { sendContactNotification } from '@/lib/sendMail';

// POST - Recevoir un message de contact
export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message }: CreateContactData = await request.json();

    // Validation des données
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Format email invalide' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Créer le message de contact
    const newContact: Omit<ContactMessage, '_id'> = {
      name,
      email,
      subject,
      message,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Sauvegarder dans la base de données
    const result = await db.collection('contacts').insertOne(newContact);

    // Envoyer l'email de notification
    const emailResult = await sendContactNotification({
      name,
      email,
      subject,
      message
    });

    if (!emailResult.success) {
      console.error('Erreur envoi email notification:', emailResult.error);
      // On continue même si l'email échoue, le message est sauvegardé
    }

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
      data: { id: result.insertedId }
    });
  } catch (error) {
    console.error('Erreur réception contact:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 