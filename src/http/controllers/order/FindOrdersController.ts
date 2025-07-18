import { Request, Response } from "express";

import { FindOrdersRepository } from "../../../infrastruture/repository/order/FindOrdersRepository";
import { FindOrdersUseCase } from "../../../application/usecases/order/FindOrdersUseCase";

export class FindOrdersController {
  async handle(request: Request, response: Response) {
    const findOrdersRepository = new FindOrdersRepository();

    const useCase = new FindOrdersUseCase(findOrdersRepository);

    try {
      const orders = await useCase.execute();

      return response.status(200).json({ orders });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
