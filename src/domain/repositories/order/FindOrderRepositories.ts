import { Order } from "../../entities/order/Order";

export interface IFindOrderRepositories {
  findOrder(id: string): Promise<Order | null>;
}
