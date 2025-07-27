import { RefreshToken } from "../../../domain/entities/refresh-token/RefreshToken";
import { IDeleteManyRefreshTokenRepositories } from "../../../domain/repositories/refresh-token/DeleteManyRefreshTokenRepositories";
import { IFindRefreshTokenUserIdRepositories } from "../../../domain/repositories/refresh-token/FindRefreshTokenUserIdRepositories";
import { ITokenProvider } from "../../../shared/providers/tokens/jwt/ITokenProvider";
import { IRefreshTokenDTO } from "../../dtos/refresh-token/RefreshTokenDto";
import { IRefreshTokenResponseDTO } from "../../dtos/refresh-token/RefreshTokenResponseDto";
import dayjs from "dayjs";

export class RefreshTokenUseCase {
  constructor(
    private readonly findRefreshTokenUserIdRepository: IFindRefreshTokenUserIdRepositories,
    private readonly tokenProvider: ITokenProvider,
    private readonly deleteManyRefreshTokenRepository: IDeleteManyRefreshTokenRepositories
  ) {}

  async execute(data: IRefreshTokenDTO): Promise<IRefreshTokenResponseDTO> {
    const refresh_token = await this.findRefreshTokenUserIdRepository.find(
      data.userId
    );

    if (!refresh_token) {
      throw new Error("Refresh token invalid!");
    }

    const refreshTokenExpired = dayjs().isAfter(refresh_token.expiredIn);

    const token = await this.tokenProvider.generateToken({
      role: refresh_token.roleUser,
      id: refresh_token.userId,
    });

    if (refreshTokenExpired) {
      await this.deleteManyRefreshTokenRepository.deleteMany(data.userId);

      const expiredIn = dayjs().add(7, "day").toDate();

      const newRefreshToken = new RefreshToken(
        expiredIn,
        refresh_token.userId,
        refresh_token.roleUser
      );

      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}
