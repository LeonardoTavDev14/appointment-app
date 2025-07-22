import { Request, Response } from "express";

import { FindStoresOpenRepository } from "../../../infrastruture/repository/store/FindStoresOpenRepository";
import { FindStoresOpenUseCase } from "../../../application/usecases/store/FindStoresOpenUseCase";

export class FindStoresOpenController {
  async handle(request: Request, response: Response) {
    const findStoresOpenRepository = new FindStoresOpenRepository();

    const useCase = new FindStoresOpenUseCase(findStoresOpenRepository);

    try {
      const storesOpen = await useCase.execute();

      return response.status(200).json({ storesOpen });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
