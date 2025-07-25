import { ICreateUserRepositories } from "../../../domain/repositories/user/CreateUserRepositories";
import { User } from "../../../domain/entities/user/User";
import { prismaClient } from "../../prisma/db";

export class CreateUserRepository implements ICreateUserRepositories {
  async create(user: User): Promise<User> {
    const created = await prismaClient.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        age: user.age,
        role: user.role,
        resetToken: null,
        resetExpiredToken: null,
        loginAttempt: 0,
        lockAccount: null,
      },
    });

    return new User(
      created.name,
      created.email,
      created.password,
      created.age,
      created.role,
      created.id,
      created.resetToken,
      created.resetExpiredToken,
      created.loginAttempt,
      created.lockAccount
    );
  }
}
