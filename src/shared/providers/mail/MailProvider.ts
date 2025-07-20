import { IMailProvider } from "../../../domain/provider/MailProvider";
import { mailTransporter } from "./mailTransporter";
import dotenv from "dotenv";
dotenv.config();

export class MailProvider implements IMailProvider {
  async send(name: string, email: string, resetToken: string): Promise<void> {
    const resetLink = `${process.env.URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.AUTH_USER,
      to: email,
      subject: "Password reset",
      text: "Click the link/button below to change your password",
      html: `<body style="font-family: 'Poppins', Arial, sans-serif; margin: 0; padding: 20px; background-color: #f0f2f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; box-sizing: border-box;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); width: 100%; max-width: 500px; box-sizing: border-box; text-align: center;">
          <h1 style="color: #2c3e50; font-size: 28px; margin-bottom: 25px;">Esqueceu sua senha?</h1>
          <p style="font-size: 16px; color: #555555; line-height: 1.6; margin-bottom: 25px;">
              Olá, ${name}
              <br><br>
              Recebemos uma solicitação para redefinir a senha da sua conta.
              <br>
              Para criar uma nova senha, clique no botão abaixo:
          </p>
          <p style="margin-bottom: 30px;">
              <a href="${resetLink}"
                 style="display: inline-block; padding: 14px 28px; font-size: 17px; color: #ffffff; background-color: #007bff;
                 text-decoration: none; border-radius: 8px; font-weight: bold; transition: background-color 0.3s ease;">
                  Redefinir Senha Agora
              </a>
          </p>
          <p style="font-size: 14px; color: #777777; line-height: 1.5; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px;">
              Se você não solicitou esta redefinição de senha, por favor, ignore este e-mail.
              <br>
              Este link é válido por 15 minutos.
          </p>
          <p style="font-size: 14px; color: #777777; line-height: 1.5; margin-top: 15px;">
              Atenciosamente, <br> A Equipe Agendamento de Cortes Ltda.
          </p>
      </div>
  </body>`,
    };

    try {
      await mailTransporter.sendMail(mailOptions);
    } catch (err: any) {
      if (err instanceof Error) {
        throw new Error(`Failed to send email: ${err.message}`);
      }

      throw new Error(`Unknown error: ${err.message}`);
    }
  }
}
