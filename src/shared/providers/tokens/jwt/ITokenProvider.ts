import { IAuthResponseUserDTO } from "../../../../application/dtos/user/AuthResponseUserDto";
import { RefreshToken } from "../../../../domain/entities/refresh-token/RefreshToken";

export interface ITokenPayload {
  role: "ADMIN" | "USER" | "BARBER";
  id: string;
  refresh_token: RefreshToken;
  name: string;
}

export interface ITokenProvider {
  generateToken(payloadToken: ITokenPayload): Promise<IAuthResponseUserDTO>;
}
