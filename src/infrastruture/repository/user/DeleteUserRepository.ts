import { IDeleteUserRepositories } from "../../../domain/repositories/user/DeleteUserRepositories";
import { prismaClient } from "../../prisma/db";

export class DeleteUserRepository implements IDeleteUserRepositories {
  async delete(id: string): Promise<void> {
    await prismaClient.user.delete({
      where: { id },
    });
  }
}
