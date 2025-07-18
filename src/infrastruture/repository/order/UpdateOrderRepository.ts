import { IUpdateOrderRepositories } from "../../../domain/repositories/order/UpdateOrderRepositories";
import { Order } from "../../../domain/entities/order/Order";
import { prismaClient } from "../../prisma/db";

export class UpdateOrderRepository implements IUpdateOrderRepositories {
  async update(order: Order): Promise<void> {
    await prismaClient.order.update({
      where: { id: order.id },
      data: {
        status: order.status,
      },
    });
  }
}
