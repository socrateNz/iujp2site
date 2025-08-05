import nodemailer from 'nodemailer';

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true pour 465, false pour les autres ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Interface pour les données de contact
export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Interface pour la réponse admin
export interface ReplyData {
  to: string;
  subject: string;
  message: string;
  adminName: string;
}

// Envoi d'email de notification pour nouveau message contact
export async function sendContactNotification(contactData: ContactData) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    subject: `Nouveau message de contact: ${contactData.subject}`,
    html: `
      <h2>Nouveau message de contact reçu</h2>
      <p><strong>Nom:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Sujet:</strong> ${contactData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>Message envoyé depuis le formulaire de contact du site UIJP II</em></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Erreur envoi email notification:', error);
    return { success: false, error };
  }
}

// Envoi de réponse admin
export async function sendAdminReply(replyData: ReplyData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: replyData.to,
    subject: `Re: ${replyData.subject}`,
    html: `
      <h2>Réponse de l'Université Internationale Jean Paul II de Bafang</h2>
      <p>Bonjour,</p>
      <p>${replyData.message.replace(/\n/g, '<br>')}</p>
      <br>
      <p>Cordialement,</p>
      <p><strong>${replyData.adminName}</strong></p>
      <p>Équipe administrative<br>
      Université Internationale Jean Paul II de Bafang</p>
      <hr>
      <p><em>ne répondez pas a cet email. <br /> Cet email a été envoyé depuis le système d'administration de l'UIJP II</em></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Erreur envoi email réponse:', error);
    return { success: false, error };
  }
}

// Test de connexion email
export async function testEmailConnection() {
  try {
    await transporter.verify();
    return { success: true };
  } catch (error) {
    console.error('Erreur test connexion email:', error);
    return { success: false, error };
  }
} 