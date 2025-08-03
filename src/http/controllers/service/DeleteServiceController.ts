import { Request, Response } from "express";

import { FindServiceRepository } from "../../../infrastruture/repository/service/FindServiceRepository";
import { FindUserRepository } from "../../../infrastruture/repository/user/FindUserRepository";
import { FindUserIdStoreRepository } from "../../../infrastruture/repository/store/FindUserIdStoreRepository";
import { CreateLogRepository } from "../../../infrastruture/repository/log/CreateLogRepository";
import { DeleteServiceRepository } from "../../../infrastruture/repository/service/DeleteServiceRepository";
import { DeleteServiceUseCase } from "../../../application/usecases/service/DeleteServiceUseCase";

export class DeleteServiceController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const userId = request.user.id;
    const { details, observations } = request.body;

    const findServiceRepository = new FindServiceRepository();
    const findUserRepository = new FindUserRepository();
    const findUserIdStoreRepository = new FindUserIdStoreRepository();
    const createLogRepository = new CreateLogRepository();
    const deleteServiceRepository = new DeleteServiceRepository();

    const useCase = new DeleteServiceUseCase(
      findServiceRepository,
      findUserRepository,
      findUserIdStoreRepository,
      createLogRepository,
      deleteServiceRepository
    );

    try {
      await useCase.execute({ id, userId, details, observations });

      return response
        .status(200)
        .json({ message: "Store service deleted successfully!" });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
