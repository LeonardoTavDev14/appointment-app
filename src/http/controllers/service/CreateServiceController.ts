import { Request, Response } from "express";

import { FindStoreServiceRepository } from "../../../infrastruture/repository/service/FindStoreServicesRepository";
import { FindUserIdStoreRepository } from "../../../infrastruture/repository/store/FindUserIdStoreRepository";
import { CreateServiceRepository } from "../../../infrastruture/repository/service/CreateServiceRepository";
import { CreateServiceUseCase } from "../../../application/usecases/service/CreateServiceUseCase";

export class CreateServiceController {
  async handle(request: Request, response: Response) {
    const userId = request.user.id;
    const { typeService, prices, observations } = request.body;

    const findStoreServiceRepository = new FindStoreServiceRepository();
    const findUserIdStoreRepository = new FindUserIdStoreRepository();
    const createServiceRepository = new CreateServiceRepository();

    const useCase = new CreateServiceUseCase(
      findStoreServiceRepository,
      findUserIdStoreRepository,
      createServiceRepository
    );

    try {
      const service = await useCase.execute({
        typeService,
        prices,
        observations,
        userId,
      });

      return response.status(201).json({ service });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
