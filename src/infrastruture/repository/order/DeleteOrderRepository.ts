import { IDeleteOrderRepositories } from "../../../domain/repositories/order/DeleteOrderRepositories";
import { prismaClient } from "../../prisma/db";

export class DeleteOrderRepository implements IDeleteOrderRepositories {
  async delete(id: string): Promise<void> {
    await prismaClient.order.delete({
      where: { id },
    });
  }
}
