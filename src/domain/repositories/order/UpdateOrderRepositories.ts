import { Order } from "../../entities/order/Order";

export interface IUpdateOrderRepositories {
  update(order: Order): Promise<void>;
}
