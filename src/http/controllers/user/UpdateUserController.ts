import { Request, Response } from "express";

import { FindUserRepository } from "../../../infrastruture/repository/user/FindUserRepository";
import { UpdateUserRepository } from "../../../infrastruture/repository/user/UpdateUserRepository";

import { UpdateUserUseCase } from "../../../application/usecases/user/UpdateUserUseCase";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const id = request.user.id;
    const { name, age } = request.body;

    const findUserRepository = new FindUserRepository();
    const updateUserRepository = new UpdateUserRepository();

    const useCase = new UpdateUserUseCase(
      findUserRepository,
      updateUserRepository
    );

    try {
      await useCase.execute({ id, name, age });

      return response.status(200).json({
        message: "Your information has been changed successfully!",
      });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
