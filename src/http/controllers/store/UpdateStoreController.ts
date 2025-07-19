import { Request, Response } from "express";

import { FindByIdStoreRepository } from "../../../infrastruture/repository/store/FindByIdStoreRepository";
import { FindNameCepStoreRepository } from "../../../infrastruture/repository/store/FindNameCepStoreRepository";
import { UpdateStoreRepository } from "../../../infrastruture/repository/store/UpdateStoreRepository";
import { UpdateStoreUseCase } from "../../../application/usecases/store/UpdateStoreUseCase";

export class UpdateStoreController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, businessFone, cep, address } = request.body;

    const findByIdStoreRepository = new FindByIdStoreRepository();
    const findNameCepStoreRepository = new FindNameCepStoreRepository();
    const updateStoreRepository = new UpdateStoreRepository();

    const useCase = new UpdateStoreUseCase(
      findByIdStoreRepository,
      findNameCepStoreRepository,
      updateStoreRepository
    );

    try {
      await useCase.execute({ id, name, businessFone, cep, address });

      return response.status(200).json({
        message: "Store information has been changed successfully!",
      });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
