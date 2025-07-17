import { IUpdateUserRepositories } from "../../../domain/repositories/user/UpdateUserRepositories";
import { User } from "../../../domain/entities/user/User";
import { prismaClient } from "../../prisma/db";

export class UpdateUserRepository implements IUpdateUserRepositories {
  async update(user: User): Promise<void> {
    await prismaClient.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        age: user.age,
      },
    });
  }
}
