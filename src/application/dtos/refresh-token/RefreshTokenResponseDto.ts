import { RefreshToken } from "../../../domain/entities/refresh-token/RefreshToken";

export interface IRefreshTokenResponseDTO {
  token: string;
  refreshToken?: RefreshToken;
}
