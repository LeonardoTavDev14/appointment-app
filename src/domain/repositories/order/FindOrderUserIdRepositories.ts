import { Order } from "../../entities/order/Order";

export interface IFindOrderUserIdRepositories {
  findOrder(userId: string): Promise<Order | null>;
}
