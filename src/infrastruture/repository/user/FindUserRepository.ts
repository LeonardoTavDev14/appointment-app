import { IFindUserRepositories } from "../../../domain/repositories/user/FindUserRepositories";
import { User } from "../../../domain/entities/user/User";
import { prismaClient } from "../../prisma/db";

export class FindUserRepository implements IFindUserRepositories {
  async findUser(id: string): Promise<User | null> {
    const userData = await prismaClient.user.findFirst({
      where: { id },
    });

    if (!userData) {
      return null;
    }

    return new User(
      userData.name,
      userData.email,
      userData.password,
      userData.age,
      userData.role,
      userData.id,
      userData.resetToken,
      userData.resetExpiredToken,
      userData.loginAttempt,
      userData.lockAccount
    );
  }
}
