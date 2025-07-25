import { IFindManyUsersRepositories } from "../../../domain/repositories/user/FindManyUsersRepositories";
import { prismaClient } from "../../prisma/db";
import { User } from "../../../domain/entities/user/User";

export class FindManyUsersRepository implements IFindManyUsersRepositories {
  async findMany(): Promise<User[] | null> {
    const users = await prismaClient.user.findMany();

    if (!users.length) {
      return null;
    }

    return users.map(
      (user) =>
        new User(
          user.name,
          user.email,
          user.password,
          user.age,
          user.role,
          user.id,
          user.resetToken,
          user.resetExpiredToken,
          user.loginAttempt,
          user.lockAccount
        )
    );
  }
}
