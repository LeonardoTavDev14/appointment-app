import { IFindUserTokenRepositories } from "../../../domain/repositories/user/FindUserTokenRepositories";
import { ICompareProvider } from "../../../shared/providers/bcrypt/compare/ICompareProvider";
import { IHashProvider } from "../../../shared/providers/bcrypt/hash/IHashProvider";
import { ISaveUserRepositories } from "../../../domain/repositories/user/SaveUserRepositories";
import { IResetPasswordUserDTO } from "../../dtos/user/ResetPasswordUserDto";
import dayjs from "dayjs";
import { User } from "../../../domain/entities/user/User";

export class ResetPasswordUserUseCase {
  constructor(
    private readonly findUserTokenRepository: IFindUserTokenRepositories,
    private readonly compareProvider: ICompareProvider,
    private readonly hashProvider: IHashProvider,
    private readonly saveUserRepository: ISaveUserRepositories
  ) {}

  async execute(data: IResetPasswordUserDTO): Promise<void> {
    const user = await this.findUserTokenRepository.findToken(data.token);

    if (!user) {
      throw new Error("Token invalid or expired!");
    }

    const timeResetTokenExpired = dayjs().isAfter(user.resetExpiredToken);

    if (timeResetTokenExpired) {
      throw new Error("Token invalid or expired!");
    }

    const matchPassword = await this.compareProvider.compare(
      data.password,
      user.password
    );

    if (matchPassword) {
      throw new Error(
        "Your new password must not be the same as your current one!"
      );
    }

    const newPasswordHash = await this.hashProvider.hash(data.password);

    const updated = User.updateResetPassword(user, newPasswordHash);

    await this.saveUserRepository.save(updated);
  }
}
