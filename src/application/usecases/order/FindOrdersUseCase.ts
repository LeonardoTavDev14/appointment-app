import { IFindOrdersRepositories } from "../../../domain/repositories/order/FindOrdersRepositories";

import { Order } from "../../../domain/entities/order/Order";

export class FindOrdersUseCase {
  constructor(private readonly findOrdersRepository: IFindOrdersRepositories) {}

  async execute(): Promise<Order[]> {
    const orders = await this.findOrdersRepository.findOrders();

    if (!orders || orders.length === 0) {
      throw new Error("No orders found!");
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
