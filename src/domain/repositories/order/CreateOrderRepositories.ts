import { Order } from "../../entities/order/Order";

export interface ICreateOrderRepositories {
  create(order: Order): Promise<Order>;
}
