import { RefreshToken } from "../../entities/refresh-token/RefreshToken";

export interface IFindRefreshTokenUserIdRepositories {
  find(userId: string): Promise<RefreshToken | null>;
}
