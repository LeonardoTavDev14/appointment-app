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

    // REVISAR DEPOIS PARA VER SE É REALMENTE UTIL ESTÁ VALIDAÇÃO PARA A EXPERIÊNCIA DO USUÁRIO/ADMIN/BARBER UX UI
    if (order.status === "APPROVED" || order.status === "DENIED") {
      throw new Error(
        "You cannot edit an order that has already been approved or denied!"
      );
    }

    if (order.status === data.newStatus) {
      throw new Error("You cannot change the order status to the same status");
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
      userId: order.userId,
      admin: data.admin,
      observations: `No comments!`,
    });

    await this.updateOrderRepository.update(updated);
  }
}
