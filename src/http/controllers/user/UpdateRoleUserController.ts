import { Request, Response } from "express";

import { FindUserRepository } from "../../../infrastruture/repository/user/FindUserRepository";
import { FindOrderUserIdRepository } from "../../../infrastruture/repository/order/FindOrderUserIdRepository";
import { UpdateRoleUserRepository } from "../../../infrastruture/repository/user/UpdateRoleUserRepository";
import { UpdateRoleUserUseCase } from "../../../application/usecases/user/UpdateRoleUserUseCase";

export class UpdateRoleUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { newRole } = request.body;

    const findUserRepository = new FindUserRepository();
    const findOrderUserIdRepository = new FindOrderUserIdRepository();
    const updateRoleUserRepository = new UpdateRoleUserRepository();

    const useCase = new UpdateRoleUserUseCase(
      findUserRepository,
      findOrderUserIdRepository,
      updateRoleUserRepository
    );

    try {
      await useCase.execute({ id, newRole });

      return response.status(200).json({
        message: "User permission has been changed successfully!",
      });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
