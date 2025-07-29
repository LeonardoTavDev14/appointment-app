import { Request, Response } from "express";

import { FindByIdStoreRepository } from "../../../infrastruture/repository/store/FindByIdStoreRepository";
import { FindStoreServiceRepository } from "../../../infrastruture/repository/service/FindStoreServicesRepository";
import { FindStoresServicesUseCase } from "../../../application/usecases/store/FindStoresServicesUseCase";

export class FindStoresServicesController {
  async handle(request: Request, response: Response) {
    const { storeId } = request.params;

    const findByIdStoreRepository = new FindByIdStoreRepository();
    const findStoreServiceRepository = new FindStoreServiceRepository();

    const useCase = new FindStoresServicesUseCase(
      findByIdStoreRepository,
      findStoreServiceRepository
    );

    try {
      const storeDetails = await useCase.execute({ storeId });

      return response.status(200).json({ storeDetails });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
