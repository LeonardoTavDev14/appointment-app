import { ICreateOrderRepositories } from "../../../domain/repositories/order/CreateOrderRepositories";
import { Order } from "../../../domain/entities/order/Order";
import { prismaClient } from "../../prisma/db";

export class CreateOrderRepository implements ICreateOrderRepositories {
  async create(order: Order): Promise<Order> {
    const created = await prismaClient.order.create({
      data: {
        description: order.description,
        fone: order.fone,
        status: order.status,
        userId: order.userId,
        observations: order.observations,
      },
    });

    return new Order(
      created.description,
      created.fone,
      created.status,
      created.userId,
      created.observations,
      created.id
    );
  }
}
