import { IDeleteServiceRepositories } from "../../../domain/repositories/service/DeleteServiceRepositories";
import { prismaClient } from "../../prisma/db";

export class DeleteServiceRepository implements IDeleteServiceRepositories {
  async delete(id: string): Promise<void> {
    await prismaClient.service.delete({
      where: { id },
    });
  }
}
