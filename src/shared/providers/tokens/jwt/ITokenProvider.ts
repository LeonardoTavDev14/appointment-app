import { IAuthResponseUserDTO } from "../../../../application/dtos/user/AuthResponseUserDto";

export interface ITokenPayload {
  role: "ADMIN" | "USER" | "BARBER";
  id: string;
  name: string;
}

export interface ITokenProvider {
  generateToken(payloadToken: ITokenPayload): Promise<IAuthResponseUserDTO>;
}
