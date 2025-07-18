import { Request, Response } from "express";

import { FindOrderRepository } from "../../../infrastruture/repository/order/FindOrderRepository";
import { CreateLogRepository } from "../../../infrastruture/repository/log/CreateLogRepository";
import { DeleteOrderRepository } from "../../../infrastruture/repository/order/DeleteOrderRepository";
import { DeleteOrderUseCase } from "../../../application/usecases/order/DeleteOrderUseCase";

export class DeleteOrderController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const admin = request.user.id;

    const findOrderRepository = new FindOrderRepository();
    const createLogRepository = new CreateLogRepository();
    const deleteOrderRepository = new DeleteOrderRepository();

    const useCase = new DeleteOrderUseCase(
      findOrderRepository,
      createLogRepository,
      deleteOrderRepository
    );

    try {
      await useCase.execute({ id, admin });

      return response.status(200).json({
        message: "Request successfully deleted from the database!",
      });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
