import { IDeleteStoreRepositories } from "../../../domain/repositories/store/DeleteStoreRepositories";
import { prismaClient } from "../../prisma/db";

export class DeleteStoreRepository implements IDeleteStoreRepositories {
  async delete(id: string): Promise<void> {
    await prismaClient.store.delete({
      where: { id },
    });
  }

  async deletedByUser(userId: string): Promise<void> {
    await prismaClient.store.delete({
      where: { userId },
    });
  }
}
