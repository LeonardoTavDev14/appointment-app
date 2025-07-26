import { sign } from "jsonwebtoken";
import { ITokenProvider } from "./ITokenProvider";
import { ITokenPayload } from "./ITokenProvider";
import dotenv from "dotenv";
dotenv.config();

export class TokenProvider implements ITokenProvider {
  async generateToken(payloadToken: ITokenPayload): Promise<string> {
    const token = sign(
      { role: payloadToken.role },
      process.env.JWT_SECRET as string,
      {
        subject: payloadToken.id,
        expiresIn: 900000,
      }
    );

    return token;
  }
}
