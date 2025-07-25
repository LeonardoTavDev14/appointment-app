import { RefreshToken } from "../../../domain/entities/refresh-token/RefreshToken";

export interface IAuthResponseUserDTO {
  token: string;
  refresh_token: RefreshToken;
  name: string;
}
