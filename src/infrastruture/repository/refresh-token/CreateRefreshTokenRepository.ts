import { ICreateRefreshTokenRepositories } from "../../../domain/repositories/refresh-token/CreateRefreshTokenRepositories";
import { RefreshToken } from "../../../domain/entities/refresh-token/RefreshToken";
import { prismaClient } from "../../prisma/db";

export class CreateRefreshTokenRepository
  implements ICreateRefreshTokenRepositories
{
  async create(refresh_token: RefreshToken): Promise<RefreshToken> {
    const created = await prismaClient.refreshToken.create({
      data: {
        expiredIn: refresh_token.expiredIn,
        name: refresh_token.name,
        roleUser: refresh_token.roleUser,
        userId: refresh_token.userId,
      },
    });

    return new RefreshToken(
      created.expiredIn,
      created.userId,
      created.name,
      created.roleUser,
      created.id
    );
  }
}
