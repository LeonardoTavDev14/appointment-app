import { Request, Response } from "express";

import { FindUserIdStoreRepository } from "../../../infrastruture/repository/store/FindUserIdStoreRepository";
import { CreateLogRepository } from "../../../infrastruture/repository/log/CreateLogRepository";
import { DeleteStoreRepository } from "../../../infrastruture/repository/store/DeleteStoreRepository";
import { DeleteStoreUserUseCase } from "../../../application/usecases/store/DeleteStoreUserUseCase";

export class DeleteStoreUserController {
  async handle(request: Request, response: Response) {
    const id = request.user.id;
    const { details, observations } = request.body;

    const findUserIdStoreRepository = new FindUserIdStoreRepository();
    const createLogRepository = new CreateLogRepository();
    const deleteStoreRepository = new DeleteStoreRepository();

    const useCase = new DeleteStoreUserUseCase(
      findUserIdStoreRepository,
      createLogRepository,
      deleteStoreRepository
    );

    try {
      await useCase.execute({ id, details, observations });

      return response.status(200).json({
        message: "Your store has been successfully deleted from the system!",
      });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
