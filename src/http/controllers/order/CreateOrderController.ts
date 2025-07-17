import { Request, Response } from "express";

import { FindOrderRepository } from "../../../infrastruture/repository/order/FindOrderRepository";
import { CreateOrderRepository } from "../../../infrastruture/repository/order/CreateOrderRepository";

import { CreateOrderUseCase } from "../../../application/usecases/order/CreateOrderUseCase";

export class CreateOrderController {
  async handle(request: Request, response: Response) {
    const userId = request.user.id;
    const { description, fone, observations } = request.body;

    const findOrderRepository = new FindOrderRepository();
    const createOrderRepository = new CreateOrderRepository();

    const useCase = new CreateOrderUseCase(
      findOrderRepository,
      createOrderRepository
    );

    try {
      const order = await useCase.execute({
        description,
        fone,
        userId,
        observations,
      });

      return response.status(200).json({ order });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
