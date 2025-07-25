import { IDeleteManyRefreshTokenRepositories } from "../../../domain/repositories/refresh-token/DeleteManyRefreshTokenRepositories";
import { prismaClient } from "../../prisma/db";

export class DeleteManyRefreshTokenRepository
  implements IDeleteManyRefreshTokenRepositories
{
  async deleteMany(userId: string): Promise<void> {
    await prismaClient.refreshToken.deleteMany({
      where: { userId },
    });
  }
}
