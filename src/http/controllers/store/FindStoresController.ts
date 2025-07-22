import { Request, Response } from "express";

import { FindStoresRepository } from "../../../infrastruture/repository/store/FindStoresRepository";
import { FindStoresUseCase } from "../../../application/usecases/store/FindStoresUseCase";

export class FindStoresController {
  async handle(request: Request, response: Response) {
    const findStoresRepository = new FindStoresRepository();

    const useCase = new FindStoresUseCase(findStoresRepository);

    try {
      const stores = await useCase.execute();

      return response.status(200).json({ stores });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
