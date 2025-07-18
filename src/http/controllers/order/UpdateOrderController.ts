import { Request, Response } from "express";

import { FindOrderRepository } from "../../../infrastruture/repository/order/FindOrderRepository";
import { CreateLogRepository } from "../../../infrastruture/repository/log/CreateLogRepository";
import { UpdateOrderRepository } from "../../../infrastruture/repository/order/UpdateOrderRepository";
import { UpdateOrderUseCase } from "../../../application/usecases/order/UpdateOrderUseCase";

export class UpdateOrderController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { newStatus } = request.body;
    const admin = request.user.id;

    const findOrderRepository = new FindOrderRepository();
    const createLogRepository = new CreateLogRepository();
    const updateOrderRepository = new UpdateOrderRepository();

    const useCase = new UpdateOrderUseCase(
      findOrderRepository,
      createLogRepository,
      updateOrderRepository
    );

    try {
      await useCase.execute({ id, newStatus, admin });

      return response.status(200).json({
        message: "Order changed successfully!",
      });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
