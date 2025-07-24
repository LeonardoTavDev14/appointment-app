import { Request, Response } from "express";

import { FindServiceRepository } from "../../../infrastruture/repository/service/FindServiceRepository";
import { FindUserIdStoreRepository } from "../../../infrastruture/repository/store/FindUserIdStoreRepository";
import { UpdateServiceRepository } from "../../../infrastruture/repository/service/UpdateServiceRepository";
import { UpdateServiceUseCase } from "../../../application/usecases/service/UpdateServiceUseCase";

export class UpdateServiceController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { typeService, prices, observations } = request.body;
    const userId = request.user.id;

    const findServiceRepository = new FindServiceRepository();
    const findUserIdStoreRepository = new FindUserIdStoreRepository();
    const updateServiceRepository = new UpdateServiceRepository();

    const useCase = new UpdateServiceUseCase(
      findServiceRepository,
      findUserIdStoreRepository,
      updateServiceRepository
    );

    try {
      await useCase.execute({ id, typeService, prices, observations, userId });

      return response.status(200).json({
        message: "Service information updated successfully!",
      });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
