import { Request, Response } from "express";

import { FindRefreshTokenUserIdRepository } from "../../../infrastruture/repository/refresh-token/FindRefreshTokenUserIdRepository";
import { TokenProvider } from "../../../shared/providers/tokens/jwt/TokenProvider";
import { DeleteManyRefreshTokenRepository } from "../../../infrastruture/repository/refresh-token/DeleteManyRefreshTokenRepository";
import { RefreshTokenUseCase } from "../../../application/usecases/refresh-token/RefreshTokenUseCase";

export class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const userId = request.user.id;

    const findRefreshTokenUserIdRepository =
      new FindRefreshTokenUserIdRepository();
    const tokenProvider = new TokenProvider();
    const deleteManyRefreshTokenRepository =
      new DeleteManyRefreshTokenRepository();

    const useCase = new RefreshTokenUseCase(
      findRefreshTokenUserIdRepository,
      tokenProvider,
      deleteManyRefreshTokenRepository
    );

    try {
      const newToken = await useCase.execute({ userId });

      return response.status(200).json(newToken);
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
