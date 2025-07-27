import { IFindRefreshTokenRepositories } from "../../../domain/repositories/refresh-token/FindRefreshTokenRepositories";
import { RefreshToken } from "../../../domain/entities/refresh-token/RefreshToken";
import { prismaClient } from "../../prisma/db";

export class FindRefreshTokenRepository
  implements IFindRefreshTokenRepositories
{
  async find(refresh_token: string): Promise<RefreshToken | null> {
    const refreshToken = await prismaClient.refreshToken.findFirst({
      where: { id: refresh_token },
    });

    if (!refreshToken) {
      return null;
    }

    return new RefreshToken(
      refreshToken.expiredIn,
      refreshToken.userId,
      refreshToken.roleUser,
      refreshToken.id
    );
  }
}
