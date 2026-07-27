import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Candidature } from '@/lib/types';
import { sendCandidatureNotification } from '@/lib/sendMail';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nom,
      prenom,
      sexe,
      telephone,
      email,
      region,
      departement,
      communeQuartier,
      dernierDiplome,
      anneeObtention,
      etablissementObtention,
      filiere,
      niveau,
    } = body;

    // Validation des champs obligatoires (Google Form)
    if (
      !nom ||
      !prenom ||
      !sexe ||
      !telephone ||
      !region ||
      !dernierDiplome ||
      !anneeObtention ||
      !filiere ||
      !niveau
    ) {
      return NextResponse.json(
        { success: false, error: 'Veuillez remplir tous les champs obligatoires (*)' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const newCandidature: Omit<Candidature, '_id'> = {
      nom: nom.trim(),
      prenom: prenom.trim(),
      sexe,
      telephone: telephone.trim(),
      email: email ? email.trim() : '',
      region: region.trim(),
      departement: departement ? departement.trim() : '',
      communeQuartier: communeQuartier ? communeQuartier.trim() : '',
      dernierDiplome: dernierDiplome.trim(),
      anneeObtention: anneeObtention.trim(),
      etablissementObtention: etablissementObtention ? etablissementObtention.trim() : '',
      filiere: filiere.trim(),
      niveau: niveau.trim(),
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insérer la candidature dans la base de données
    const result = await db.collection('candidatures').insertOne(newCandidature);

    // Envoi de l'email de notification aux administrateurs (EMAIL_TO)
    try {
      await sendCandidatureNotification({
        nom: newCandidature.nom,
        prenom: newCandidature.prenom,
        sexe: newCandidature.sexe,
        telephone: newCandidature.telephone,
        email: newCandidature.email,
        region: newCandidature.region,
        departement: newCandidature.departement,
        communeQuartier: newCandidature.communeQuartier,
        dernierDiplome: newCandidature.dernierDiplome,
        anneeObtention: newCandidature.anneeObtention,
        etablissementObtention: newCandidature.etablissementObtention,
        filiere: newCandidature.filiere,
        niveau: newCandidature.niveau,
      });
    } catch (emailErr) {
      console.error('Erreur envoi notification email candidature:', emailErr);
      // On ne bloque pas le succès si l'email rencontre un problème
    }

    return NextResponse.json({
      success: true,
      message: 'Votre candidature a été soumise avec succès ! Notre service des admissions vous contactera sous peu.',
      data: { id: result.insertedId },
    });
  } catch (error) {
    console.error('Erreur soumission candidature:', error);
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue lors de l\'enregistrement de votre candidature.' },
      { status: 500 }
    );
  }
}
