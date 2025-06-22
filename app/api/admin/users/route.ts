import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { User, ApiResponse } from '@/lib/types';

// GET - Récupérer la liste des utilisateurs
export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Accès non autorisé' },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    
    const users = await db.collection('users')
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Erreur récupération utilisateurs:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouvel utilisateur admin
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Accès non autorisé' },
        { status: 401 }
      );
    }

    const { email, name, password, role = 'user' } = await request.json();

    // Validation des données
    if (!email || !name || !password) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Vérifier si l'email existe déjà
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Cet email est déjà utilisé' },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const newUser: Omit<User, '_id'> = {
      email,
      name,
      password: hashedPassword,
      role: role as 'admin' | 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('users').insertOne(newUser);

    // Retourner l'utilisateur sans le mot de passe
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      success: true,
      data: { ...userWithoutPassword, _id: result.insertedId },
      message: 'Utilisateur créé avec succès'
    });
  } catch (error) {
    console.error('Erreur création utilisateur:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 