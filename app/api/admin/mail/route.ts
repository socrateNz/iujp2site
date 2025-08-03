// app/api/contact/route.ts
import nodemailer from "nodemailer"

export async function POST(req: Request) {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
        return Response.json({ error: "Champs manquants" }, { status: 400 })
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_TO,
            subject: "Réponse de L'Université Internationale Jean Paul II de Bafang",
            text: message,
            html: `
            <!DOCTYPE html>
                <html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <style type="text/css">
                        body {
                            font-family: 'Helvetica Neue', Arial, sans-serif;
                            line-height: 1.6;
                            color: #333333;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f7f7f7;
                        }
                        .email-container {
                            background-color: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                            padding: 30px;
                        }
                        .header {
                            color: #2c3e50;
                            font-size: 24px;
                            font-weight: 600;
                            margin-bottom: 25px;
                            padding-bottom: 15px;
                            border-bottom: 2px solid #f1f1f1;
                        }
                        .info-label {
                            font-weight: 600;
                            color: #2c3e50;
                            display: inline-block;
                            width: 80px;
                        }
                        .message-content {
                            background-color: #f9f9f9;
                            padding: 15px;
                            border-left: 3px solid #3498db;
                            margin: 15px 0;
                            border-radius: 0 4px 4px 0;
                        }
                        .footer {
                            margin-top: 30px;
                            padding-top: 15px;
                            border-top: 1px solid #eeeeee;
                            font-size: 12px;
                            color: #7f8c8d;
                            text-align: center;
                        }
                        .logo {
                            color: #3498db;
                            font-weight: bold;
                            font-size: 18px;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="header">Réponse de L'Université Internationale Jean Paul II de Bafang</div>
                        <p class"info-label">Bonjour, Veuillez ne pas répondre a cet email.</p>
                        <div class="message-content">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                        
                        <div class="footer">
                            <p><em>Message envoyé depuis le formulaire de contact du site <span class="logo">UIJP II</span></em></p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        })

        return Response.json({ success: true })
    } catch (error) {
        console.error("Erreur d'envoi :", error)
        return Response.json({ error: "Erreur d'envoi de l'email" }, { status: 500 })
    }
}
