import { IAuthResponseUserDTO } from "../../../../application/dtos/user/AuthResponseUserDto";

import { ITokenProvider } from "./ITokenProvider";
import { ITokenPayload } from "./ITokenProvider";
import { sign } from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export class TokenProvider implements ITokenProvider {
  async generateToken(
    payloadToken: ITokenPayload
  ): Promise<IAuthResponseUserDTO> {
    const token = sign(
      { role: payloadToken.role },
      process.env.JWT_SECRET as string,
      {
        subject: payloadToken.id,
        expiresIn: 900000,
      }
    );

    return { token, name: payloadToken.name };
  }
}
