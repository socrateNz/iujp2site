import nodemailer from 'nodemailer';

// Transporteur utilisant le compte dédié Gmail (App Password)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,   // hndprogram.uijp2bafang@gmail.com
    pass: process.env.EMAIL_PASS,   // App Password Gmail
  },
});

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ReplyData {
  to: string;
  subject: string;
  message: string;
  adminName: string;
}

// ── Notification admin : nouveau message de contact ───────────────────────────
export async function sendContactNotification(contactData: ContactData) {
  const adminUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/contacts`;

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nouveau message de contact — UIJP II</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a5f 0%,#1d4ed8 100%);padding:32px 40px;text-align:center;">
              <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:12px 20px;">
                <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:1px;">UIJP II</span>
              </div>
              <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:10px 0 0;letter-spacing:2px;text-transform:uppercase;">
                Université Internationale Jean Paul II
              </p>
            </td>
          </tr>

          <!-- Badge nouveau message -->
          <tr>
            <td style="padding:32px 40px 0;text-align:center;">
              <span style="display:inline-block;background:#dbeafe;color:#1d4ed8;font-size:12px;font-weight:700;padding:6px 16px;border-radius:999px;letter-spacing:1px;text-transform:uppercase;">
                📬 Nouveau message reçu
              </span>
              <h1 style="color:#0f172a;font-size:24px;font-weight:700;margin:16px 0 4px;">
                ${contactData.subject}
              </h1>
              <p style="color:#64748b;font-size:14px;margin:0;">
                Un visiteur vous a envoyé un message depuis le formulaire de contact.
              </p>
            </td>
          </tr>

          <!-- Infos expéditeur -->
          <tr>
            <td style="padding:24px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Expéditeur</p>
                    <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#0f172a;">${contactData.name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Adresse email</p>
                    <a href="mailto:${contactData.email}" style="display:block;margin:4px 0 0;font-size:15px;color:#1d4ed8;text-decoration:none;font-weight:600;">${contactData.email}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contenu du message -->
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="margin:0 0 10px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Message</p>
              <div style="background:#f8fafc;border-left:4px solid #1d4ed8;border-radius:0 12px 12px 0;padding:20px 24px;">
                <p style="margin:0;font-size:15px;color:#334155;line-height:1.7;white-space:pre-wrap;">${contactData.message}</p>
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:32px 40px;text-align:center;">
              <a href="${adminUrl}" style="display:inline-block;background:linear-gradient(135deg,#1d4ed8,#4338ca);color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;letter-spacing:0.5px;box-shadow:0 4px 14px rgba(29,78,216,0.4);">
                Voir dans le back-office →
              </a>
              <p style="margin:16px 0 0;font-size:12px;color:#94a3b8;">
                Ou copiez ce lien : <a href="${adminUrl}" style="color:#1d4ed8;">${adminUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
                Ce message a été envoyé automatiquement par le système d'administration de<br/>
                <strong style="color:#64748b;">l'Université Internationale Jean Paul II de Bafang</strong><br/>
                Ne répondez pas à cet email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const mailOptions = {
    from: `"UIJP II — Notifications" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: `📬 Nouveau message : ${contactData.subject}`,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Erreur envoi email notification:', error);
    return { success: false, error };
  }
}

// ── Réponse admin vers le visiteur ───────────────────────────────────────────
export async function sendAdminReply(replyData: ReplyData) {
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Réponse UIJP II</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a5f 0%,#1d4ed8 100%);padding:32px 40px;text-align:center;">
              <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:12px 20px;">
                <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:1px;">UIJP II</span>
              </div>
              <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:10px 0 0;letter-spacing:2px;text-transform:uppercase;">
                Université Internationale Jean Paul II
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px 0;">
              <p style="margin:0 0 6px;color:#0f172a;font-size:18px;font-weight:700;">Bonjour,</p>
              <p style="margin:0 0 24px;color:#64748b;font-size:14px;">
                Voici la réponse à votre message concernant : <strong>${replyData.subject}</strong>
              </p>
              <div style="background:#f8fafc;border-left:4px solid #1d4ed8;border-radius:0 12px 12px 0;padding:20px 24px;">
                <p style="margin:0;font-size:15px;color:#334155;line-height:1.7;white-space:pre-wrap;">${replyData.message}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px 0;">
              <p style="margin:0;color:#0f172a;font-size:14px;">Cordialement,</p>
              <p style="margin:6px 0 0;font-size:16px;font-weight:700;color:#0f172a;">${replyData.adminName}</p>
              <p style="margin:2px 0 0;font-size:13px;color:#64748b;">Équipe administrative — UIJP II Bafang</p>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;margin-top:32px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
                Cet email a été envoyé depuis le système d'administration de<br/>
                <strong style="color:#64748b;">l'Université Internationale Jean Paul II de Bafang</strong><br/>
                Ne répondez pas directement à cet email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const mailOptions = {
    from: `"UIJP II Bafang" <${process.env.EMAIL_USER}>`,
    to: replyData.to,
    subject: `Re: ${replyData.subject}`,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Erreur envoi email réponse:', error);
    return { success: false, error };
  }
}

// ── Test de connexion ────────────────────────────────────────────────────────
export async function testEmailConnection() {
  try {
    await transporter.verify();
    return { success: true };
  } catch (error) {
    console.error('Erreur test connexion email:', error);
    return { success: false, error };
  }
}