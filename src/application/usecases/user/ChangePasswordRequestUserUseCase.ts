import { IFindEmailUserRepositories } from "../../../domain/repositories/user/FindEmailUserRepositories";
import { IResetTokenProvider } from "../../../shared/providers/tokens/resetToken/IResetTokenProvider";
import { ISaveUserRepositories } from "../../../domain/repositories/user/SaveUserRepositories";
import { IMailProvider } from "../../../domain/provider/MailProvider";
import { IChangePasswordRequestDTO } from "../../dtos/user/ChangePasswordRequestDto";
import dayjs from "dayjs";
import { User } from "../../../domain/entities/user/User";

export class ChangePasswordRequestUserUseCase {
  constructor(
    private readonly findEmailUserRepository: IFindEmailUserRepositories,
    private readonly resetTokenProvider: IResetTokenProvider,
    private readonly saveUserRepository: ISaveUserRepositories,
    private readonly mailProvider: IMailProvider
  ) {}

  async execute(data: IChangePasswordRequestDTO): Promise<void> {
    const user = await this.findEmailUserRepository.findEmail(data.email);

    if (!user) {
      throw new Error(
        "If the email is correct, we will send you a link to change your password!"
      );
    }

    if (
      user.resetExpiredToken !== null &&
      dayjs().isBefore(user.resetExpiredToken)
    ) {
      await this.mailProvider.send(
        user.name,
        data.email,
        user.resetToken as string
      );
      return;
    }

    const resetToken = await this.resetTokenProvider.generateToken();
    const resetExpiredToken = dayjs().add(15, "minute").toDate();

    const updated = User.updatePassword(user, {
      email: data.email,
      resetToken: resetToken,
      resetExpiredToken: resetExpiredToken,
    });

    await this.saveUserRepository.save(updated);

    await this.mailProvider.send(user.name, data.email, resetToken);
  }
}
