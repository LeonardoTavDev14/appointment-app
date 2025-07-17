import { IFindOrderRepositories } from "../../../domain/repositories/order/FindOrderRepositories";
import { ICreateOrderRepositories } from "../../../domain/repositories/order/CreateOrderRepositories";
import { ICreateOrderDTO } from "../../dtos/order/CreateOrderDto";
import { Order } from "../../../domain/entities/order/Order";

export class CreateOrderUseCase {
  constructor(
    private readonly findOrderRepository: IFindOrderRepositories,
    private readonly createOrderRepository: ICreateOrderRepositories
  ) {}

  async execute(data: ICreateOrderDTO): Promise<Order> {
    const order = await this.findOrderRepository.findOrder(data.userId);

    if (order) {
      throw new Error("Order already exists!");
    }

    const created = new Order(
      data.description,
      data.fone,
      "PEDDING",
      data.userId,
      data.observations
    );

    return await this.createOrderRepository.create(created);
  }
}
