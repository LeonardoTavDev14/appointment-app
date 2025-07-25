import { Request, Response } from "express";

import { FindEmailUserRepository } from "../../../infrastruture/repository/user/FindEmailUserRepository";
import { LockAccountUserRepository } from "../../../infrastruture/repository/user/LockAccountUserRepository";
import { CompareProvider } from "../../../shared/providers/bcrypt/compare/CompareProvider";
import { SaveUserRepository } from "../../../infrastruture/repository/user/SaveUserRepository";
import { TokenProvider } from "../../../shared/providers/tokens/jwt/TokenProvider";
import { DeleteManyRefreshTokenRepository } from "../../../infrastruture/repository/refresh-token/DeleteManyRefreshTokenRepository";
import { CreateRefreshTokenRepository } from "../../../infrastruture/repository/refresh-token/CreateRefreshTokenRepository";

import { AuthUserUseCase } from "../../../application/usecases/user/AuthUserUseCase";

export class AuthUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const findEmailUserRepository = new FindEmailUserRepository();
    const lockAccountUserRepository = new LockAccountUserRepository();
    const compareProvider = new CompareProvider();
    const saveUserRepository = new SaveUserRepository();
    const tokenProvider = new TokenProvider();
    const deleteManyRefreshTokenRepository =
      new DeleteManyRefreshTokenRepository();
    const createRefreshTokenRepository = new CreateRefreshTokenRepository();

    const useCase = new AuthUserUseCase(
      findEmailUserRepository,
      lockAccountUserRepository,
      compareProvider,
      saveUserRepository,
      tokenProvider,
      deleteManyRefreshTokenRepository,
      createRefreshTokenRepository
    );

    try {
      const tokenResponse = await useCase.execute({ email, password });

      return response.status(200).json({ tokenResponse });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
