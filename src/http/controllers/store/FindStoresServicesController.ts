import { Request, Response } from "express";

import { FindStoreRepository } from "../../../infrastruture/repository/store/FindStoreRepository";
import { FindStoreServiceRepository } from "../../../infrastruture/repository/service/FindStoreServicesRepository";
import { FindByIdStoreRepository } from "../../../infrastruture/repository/store/FindByIdStoreRepository";
import { FindUserRepository } from "../../../infrastruture/repository/user/FindUserRepository";
import { FindUserBarberRepository } from "../../../infrastruture/repository/user/FindUserBarberRepository";
import { FindStoresServicesUseCase } from "../../../application/usecases/store/FindStoresServicesUseCase";

export class FindStoresServicesController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findStoreRepository = new FindStoreRepository();
    const findStoreServiceRepository = new FindStoreServiceRepository();
    const findByIdStoreRepository = new FindByIdStoreRepository();
    const findUserRepository = new FindUserRepository();
    const findUserBarberRepository = new FindUserBarberRepository();

    const useCase = new FindStoresServicesUseCase(
      findStoreRepository,
      findStoreServiceRepository,
      findByIdStoreRepository,
      findUserRepository,
      findUserBarberRepository
    );

    try {
      const storeInfo = await useCase.execute({ id });

      return response.status(200).json({ storeInfo });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
