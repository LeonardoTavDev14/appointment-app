import { IFindRefreshTokenUserIdRepositories } from "../../../domain/repositories/refresh-token/FindRefreshTokenUserIdRepositories";
import { RefreshToken } from "../../../domain/entities/refresh-token/RefreshToken";
import { prismaClient } from "../../prisma/db";

export class FindRefreshTokenUserIdRepository
  implements IFindRefreshTokenUserIdRepositories
{
  async find(userId: string): Promise<RefreshToken | null> {
    const userRefreshToken = await prismaClient.refreshToken.findFirst({
      where: { userId },
    });

    if (!userRefreshToken) {
      return null;
    }

    return new RefreshToken(
      userRefreshToken.expiredIn,
      userRefreshToken.userId,
      userRefreshToken.roleUser,
      userRefreshToken.id
    );
  }
}
