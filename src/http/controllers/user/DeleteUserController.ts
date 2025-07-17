import { Request, Response } from "express";

import { FindUserRepository } from "../../../infrastruture/repository/user/FindUserRepository";
import { DeleteUserRepository } from "../../../infrastruture/repository/user/DeleteUserRepository";

import { DeleteUserUseCase } from "../../../application/usecases/user/DeleteUserUseCase";

export class DeleteUserController {
  async handle(request: Request, response: Response) {
    const id = request.user.id;

    const findUserRepository = new FindUserRepository();
    const deleteUserRepository = new DeleteUserRepository();

    const useCase = new DeleteUserUseCase(
      findUserRepository,
      deleteUserRepository
    );

    try {
      await useCase.execute(id);

      return response
        .status(200)
        .json({ message: "Your account has been successfully deleted!" });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
