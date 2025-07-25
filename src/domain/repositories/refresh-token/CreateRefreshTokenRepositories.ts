import { RefreshToken } from "../../entities/refresh-token/RefreshToken";

export interface ICreateRefreshTokenRepositories {
  create(refresh_token: RefreshToken): Promise<RefreshToken>;
}
