import { IFindEmailUserRepositories } from "../../../domain/repositories/user/FindEmailUserRepositories";
import { User } from "../../../domain/entities/user/User";
import { prismaClient } from "../../prisma/db";

export class FindEmailUserRepository implements IFindEmailUserRepositories {
  async findEmail(email: string): Promise<User | null> {
    const user = await prismaClient.user.findFirst({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return null;
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
