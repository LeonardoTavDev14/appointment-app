import { Request, Response } from "express";

import { FindManyUsersRepository } from "../../../infrastruture/repository/user/FindManyUsersRepository";
import { FindManyUsersUseCase } from "../../../application/usecases/user/FindManyUsersUseCase";

export class FindManyUsersController {
  async handle(request: Request, response: Response) {
    const findManyUsersRepository = new FindManyUsersRepository();

    const useCase = new FindManyUsersUseCase(findManyUsersRepository);

    try {
      const usersData = await useCase.execute();

      return response.status(200).json({ usersData });
    } catch (err: any) {
      return response.status(200).json({
        message: err.message,
      });
    }
  }
}
