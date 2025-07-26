import { ICreateUserSendProvider } from "./ICreateUserSendProvider";
import { mailTransporter } from "../mailTransporter";
import dotenv from "dotenv";
dotenv.config();

export class CreateUserSendProvider implements ICreateUserSendProvider {
  async send(name: string, email: string): Promise<void> {
    const mailOptions = {
      from: process.env.AUTH_USER,
      to: email.toLowerCase(),
      subject: "Welcome to our scheduling system",
      text: `Welcome to the scheduling system`,
      html: `<body
      style="
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f0f2f5;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        box-sizing: border-box;    "
    >
      <div
        style="
          background-color: #ffffff;
          padding: 35px 30px; /* Aumentado padding vertical para mais respiro */
          border-radius: 12px;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
          box-sizing: border-box;
          text-align: center;     "
      >
        <h1 style="color: #2c3e50; font-size: 32px; margin-bottom: 25px">
          Hello, ${name} welcome!
        </h1>
        <p
          style="
            font-size: 17px; /* Aumentado para melhor legibilidade */
            font-family: 'Poppins', sans-serif;
            color: #555555;
            line-height: 1.6; /* Aumentado line-height para mais espaçamento entre linhas */
            margin-bottom: 25px; /* Ajustado para mais espaçamento entre parágrafos */       "
        >
          It's great to have you with us! Now it's much easier to schedule your
          cuts and take care of your style.
        </p>
        <p
          style="
            font-size: 17px; /* Aumentado para melhor legibilidade */
            color: #555555;
            line-height: 1.6; /* Aumentado line-height */
            margin-bottom: 35px; /* Ajustado para mais espaçamento antes do botão */         "
        >
          To start scheduling your next appointment, click the button below:
        </p>
        <p style="margin-bottom: 35px">
          <a
            href="${process.env.URL}"
            style="
              display: inline-block;
              padding: 16px 32px; /* Aumentado padding do botão */
              font-size: 18px; /* Aumentado font-size do botão */
              color: #ffffff;
              background-color: #0866ff;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              transition: background-color 0.3s ease;           "
          >
            Schedule My Cut
          </a>
        </p>
        <p
          style="
            font-size: 15px; /* Levemente ajustado */
            color: #777777;
            line-height: 1.6; /* Aumentado line-height */
            margin-top: 40px; /* Aumentado espaçamento superior */
            border-top: 1px solid #eeeeee;
            padding-top: 25px; /* Aumentado padding superior */         "
        >
          If you need help or have any questions, please don't hesitate to contact
          us.
        </p>
        <p
          style="
            font-size: 15px; /* Levemente ajustado */
            color: #777777;
            line-height: 1.6; /* Aumentado line-height */
            margin-top: 20px; /* Aumentado espaçamento */          "
        >
          Yours sincerely, <br />
          The Scheduling Team
        </p>
      </div>
    </body>`,
    };

    try {
      await mailTransporter.sendMail(mailOptions);
    } catch (err: any) {
      if (err instanceof Error) {
        throw new Error(`Error sending welcome email to user: ${err.message}`);
      }

      throw new Error(`Unknown error detected: ${err.message}`);
    }
  }
}
