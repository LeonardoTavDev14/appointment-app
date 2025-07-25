import { ISaveUserRepositories } from "../../../domain/repositories/user/SaveUserRepositories";
import { User } from "../../../domain/entities/user/User";
import { prismaClient } from "../../prisma/db";

export class SaveUserRepository implements ISaveUserRepositories {
  async save(user: User): Promise<void> {
    await prismaClient.user.update({
      where: { id: user.id },
      data: {
        password: user.password,
        resetToken: user.resetToken,
        resetExpiredToken: user.resetExpiredToken,
        loginAttempt: user.loginAttempt,
        lockAccount: user.lockAccount,
      },
    });
  }
}
