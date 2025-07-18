import { orderStatus } from "@prisma/client";

export interface IUpdateOrderDTO {
  id: string;
  newStatus: orderStatus;
  admin: string;
}
