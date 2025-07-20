import { Request, Response } from "express";

import { FindByIdStoreRepository } from "../../../infrastruture/repository/store/FindByIdStoreRepository";
import { CreateLogRepository } from "../../../infrastruture/repository/log/CreateLogRepository";
import { DeleteStoreRepository } from "../../../infrastruture/repository/store/DeleteStoreRepository";
import { DeleteStoreAdminUseCase } from "../../../application/usecases/store/DeleteStoreAdminUseCase";

export class DeleteStoreAdminController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const admin = request.user.id;
    const { details, observations } = request.body;

    const findByIdStoreRepository = new FindByIdStoreRepository();
    const createLogRepository = new CreateLogRepository();
    const deleteStoreRepository = new DeleteStoreRepository();

    const useCase = new DeleteStoreAdminUseCase(
      findByIdStoreRepository,
      createLogRepository,
      deleteStoreRepository
    );

    try {
      await useCase.execute({ id, admin, details, observations });

      return response.status(200).json({
        message: "Store successfully deleted from the system!",
      });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
