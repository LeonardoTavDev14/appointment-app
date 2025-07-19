import { IFindOrderRepositories } from "../../../domain/repositories/order/FindOrderRepositories";
import { IDeleteOrderRepositories } from "../../../domain/repositories/order/DeleteOrderRepositories";
import { ICreateLogRepositories } from "../../../domain/repositories/log/CreateLogRepositories";
import { IDeleteOrderDTO } from "../../dtos/order/DeleteOrderDto";

export class DeleteOrderUseCase {
  constructor(
    private readonly findOrderRepository: IFindOrderRepositories,
    private readonly createLogRepository: ICreateLogRepositories,
    private readonly deleteOrderRepository: IDeleteOrderRepositories
  ) {}

  async execute(data: IDeleteOrderDTO): Promise<void> {
    const order = await this.findOrderRepository.findOrder(data.id);

    if (!order) {
      throw new Error("Order not found!");
    }

    if (order.status !== "DENIED") {
      throw new Error(
        "This request is approved, just to remove denied requests!"
      );
    }

    await this.createLogRepository.create({
      action: `ORDER_DELETE_${order.status}`,
      details: "Request denied, therefore removing from the database!",
      userId: order.userId,
      admin: data.admin,
      observations:
        "Removing request due to lack of veracity of information provided with the request for the new barber position",
    });

    await this.deleteOrderRepository.delete(data.id);
  }
}
