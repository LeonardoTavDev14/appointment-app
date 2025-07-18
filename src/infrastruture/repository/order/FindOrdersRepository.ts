import { IFindOrdersRepositories } from "../../../domain/repositories/order/FindOrdersRepositories";
import { Order } from "../../../domain/entities/order/Order";
import { prismaClient } from "../../prisma/db";

export class FindOrdersRepository implements IFindOrdersRepositories {
  async findOrders(): Promise<Order[] | null> {
    const orders = await prismaClient.order.findMany();

    if (!orders.length) {
      return null;
    }

    return orders.map(
      (order) =>
        new Order(
          order.description,
          order.fone,
          order.status,
          order.userId,
          order.observations,
          order.id
        )
    );
  }
}
