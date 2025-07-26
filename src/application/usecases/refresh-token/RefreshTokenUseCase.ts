import { RefreshToken } from "../../../domain/entities/refresh-token/RefreshToken";
import { IDeleteManyRefreshTokenRepositories } from "../../../domain/repositories/refresh-token/DeleteManyRefreshTokenRepositories";
import { IFindRefreshTokenRepositories } from "../../../domain/repositories/refresh-token/FindRefreshTokenRepositories";
import { ITokenProvider } from "../../../shared/providers/tokens/jwt/ITokenProvider";
import { IRefreshTokenDTO } from "../../dtos/refresh-token/RefreshTokenDto";
import dayjs from "dayjs";
import { IRefreshTokenResponseDTO } from "../../dtos/refresh-token/RefreshTokenResponseDto";

export class RefreshTokenUseCase {
  constructor(
    private readonly findRefreshTokenRepository: IFindRefreshTokenRepositories,
    private readonly tokenProvider: ITokenProvider,
    private readonly deleteManyRefreshTokenRepository: IDeleteManyRefreshTokenRepositories
  ) {}

  async execute(data: IRefreshTokenDTO): Promise<IRefreshTokenResponseDTO> {
    const refreshToken = await this.findRefreshTokenRepository.find(
      data.refresh_token
    );

    if (!refreshToken) {
      throw new Error("Refresh token invalid!");
    }

    const refreshTokenExpired = dayjs().isAfter(refreshToken.expiredIn);

    const token = await this.tokenProvider.generateToken({
      role: refreshToken.roleUser,
      id: refreshToken.userId,
      name: refreshToken.name,
    });

    if (refreshTokenExpired) {
      await this.deleteManyRefreshTokenRepository.deleteMany(
        refreshToken.userId
      );

      const expiredIn = dayjs().add(7, "day").toDate();

      const newRefreshToken = new RefreshToken(
        expiredIn,
        refreshToken.userId,
        refreshToken.name,
        refreshToken.roleUser
      );

      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}
