import { Order } from "../../entities/order/Order";

export interface IFindOrdersRepositories {
  findOrders(): Promise<Order[] | null>;
}
