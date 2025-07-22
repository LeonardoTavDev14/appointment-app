import { IUpdateRoleUserRepositories } from "../../../domain/repositories/user/UpdateRoleUserRepositories";
import { User } from "../../../domain/entities/user/User";
import { prismaClient } from "../../prisma/db";

export class UpdateRoleUserRepository implements IUpdateRoleUserRepositories {
  async updateRole(user: User): Promise<void> {
    await prismaClient.user.update({
      where: { id: user.id },
      data: {
        role: user.role,
      },
    });
  }
}
