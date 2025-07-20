import { IFindUserTokenRepositories } from "../../../domain/repositories/user/FindUserTokenRepositories";
import { User } from "../../../domain/entities/user/User";
import { prismaClient } from "../../prisma/db";

export class FindUserTokenRepository implements IFindUserTokenRepositories {
  async findToken(token: string): Promise<User | null> {
    const user = await prismaClient.user.findFirst({
      where: { resetToken: token },
    });

    if (!user) {
      throw new Error("Token not found!");
    }

    return new User(
      user.name,
      user.email,
      user.password,
      user.age,
      user.role,
      user.id,
      user.resetToken,
      user.resetExpiredToken
    );
  }
}
