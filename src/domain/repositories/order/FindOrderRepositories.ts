import { Order } from "../../entities/order/Order";

export interface IFindOrderRepositories {
  findOrder(userId: string): Promise<Order | null>;
}
