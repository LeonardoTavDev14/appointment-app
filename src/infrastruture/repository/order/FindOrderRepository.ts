import { IFindOrderRepositories } from "../../../domain/repositories/order/FindOrderRepositories";
import { Order } from "../../../domain/entities/order/Order";
import { prismaClient } from "../../prisma/db";

export class FindOrderRepository implements IFindOrderRepositories {
  async findOrder(userId: string): Promise<Order | null> {
    const order = await prismaClient.order.findFirst({
      where: { userId },
    });

    if (!order) {
      return null;
    }

    return new Order(
      order.description,
      order.fone,
      order.status,
      order.userId,
      order.observations,
      order.id
    );
  }
}
