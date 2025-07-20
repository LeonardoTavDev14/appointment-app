import { Request, Response } from "express";

import { FindUserTokenRepository } from "../../../infrastruture/repository/user/FindUserTokenRepository";
import { HashProvider } from "../../../shared/providers/bcrypt/hash/HashProvider";
import { SaveUserRepository } from "../../../infrastruture/repository/user/SaveUserRepository";
import { ResetPasswordUserUseCase } from "../../../application/usecases/user/ResetPasswordUserUseCase";
import { CompareProvider } from "../../../shared/providers/bcrypt/compare/CompareProvider";

export class ResetPasswordUserController {
  async handle(request: Request, response: Response) {
    const { token } = request.params;
    const { password } = request.body;

    const findUserTokenRepository = new FindUserTokenRepository();
    const compareProvider = new CompareProvider();
    const hashProvider = new HashProvider();
    const saveUserRepository = new SaveUserRepository();

    const useCase = new ResetPasswordUserUseCase(
      findUserTokenRepository,
      compareProvider,
      hashProvider,
      saveUserRepository
    );

    try {
      await useCase.execute({ token, password });

      return response.status(200).json({
        message: "Your password has been reset successfully!",
      });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
