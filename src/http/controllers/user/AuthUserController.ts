import { Request, Response } from "express";

import { FindEmailUserRepository } from "../../../infrastruture/repository/user/FindEmailUserRepository";
import { CompareProvider } from "../../../shared/providers/bcrypt/compare/CompareProvider";
import { TokenProvider } from "../../../shared/providers/tokens/jwt/TokenProvider";

import { AuthUserUseCase } from "../../../application/usecases/user/AuthUserUseCase";

export class AuthUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const findEmailUserRepository = new FindEmailUserRepository();
    const compareProvider = new CompareProvider();
    const tokenProvider = new TokenProvider();

    const useCase = new AuthUserUseCase(
      findEmailUserRepository,
      compareProvider,
      tokenProvider
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
