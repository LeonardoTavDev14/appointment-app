import { IFindOrderRepositories } from "../../../domain/repositories/order/FindOrderRepositories";
import { IUpdateOrderRepositories } from "../../../domain/repositories/order/UpdateOrderRepositories";
import { IUpdateOrderDTO } from "../../dtos/order/UpdateOrderDto";
import { Order } from "../../../domain/entities/order/Order";
import { ICreateLogRepositories } from "../../../domain/repositories/log/CreateLogRepositories";

export class UpdateOrderUseCase {
  constructor(
    private readonly findOrderRepository: IFindOrderRepositories,
    private readonly createLogRepository: ICreateLogRepositories,
    private readonly updateOrderRepository: IUpdateOrderRepositories
  ) {}

  async execute(data: IUpdateOrderDTO): Promise<void> {
    const order = await this.findOrderRepository.findOrder(data.id);

    if (!order) {
      throw new Error("Order not found!");
    }

    if (order.status === data.newStatus) {
      if (data.newStatus === "APPROVED") {
        throw new Error("Order already approved!");
      }

      if (data.newStatus === "DENIED") {
        throw new Error("Order already denied!");
      }
    }

    const updated = new Order(
      order.description,
      order.fone,
      data.newStatus,
      order.userId,
      order.observations,
      order.id
    );

    await this.createLogRepository.create({
      action: `ORDER_${data.newStatus}_ACTION`,
      details: `Changing order status: ${data.newStatus} `,
      orderId: order.id as string,
      userId: order.userId,
      admin: data.admin,
      observations: `No comments!`,
    });

    await this.updateOrderRepository.update(updated);
  }
}
