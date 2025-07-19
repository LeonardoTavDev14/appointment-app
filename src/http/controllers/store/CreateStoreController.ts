import { Request, Response } from "express";

import { FindNameCepStoreRepository } from "../../../infrastruture/repository/store/FindNameCepStoreRepository";
import { FindUserIdStoreRepository } from "../../../infrastruture/repository/store/FindUserIdStoreRepository";
import { CreateStoreRepository } from "../../../infrastruture/repository/store/CreateStoreRepository";
import { CreateStoreUseCase } from "../../../application/usecases/store/CreateStoreUseCase";

export class CreateStoreController {
  async handle(request: Request, response: Response) {
    const userId = request.user.id;
    const { name, businessFone, cep, address, cnpj } = request.body;

    const findNameCepStoreRepository = new FindNameCepStoreRepository();
    const findUserIdStoreRepository = new FindUserIdStoreRepository();
    const createStoreRepository = new CreateStoreRepository();

    const useCase = new CreateStoreUseCase(
      findNameCepStoreRepository,
      findUserIdStoreRepository,
      createStoreRepository
    );

    try {
      const store = await useCase.execute({
        name,
        businessFone,
        cep,
        address,
        userId,
        cnpj,
      });

      return response.status(201).json({ store });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
