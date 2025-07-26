import { RefreshToken } from "../../entities/refresh-token/RefreshToken";

export interface IFindRefreshTokenRepositories {
  find(refresh_token: string): Promise<RefreshToken | null>;
}
