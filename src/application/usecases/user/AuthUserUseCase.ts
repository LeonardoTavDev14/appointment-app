import { IFindEmailUserRepositories } from "../../../domain/repositories/user/FindEmailUserRepositories";
import { ICompareProvider } from "../../../shared/providers/bcrypt/compare/ICompareProvider";
import { ITokenProvider } from "../../../shared/providers/tokens/jwt/ITokenProvider";
import { IAuthUserDTO } from "../../dtos/user/AuthUserDto";
import { IAuthResponseUserDTO } from "../../dtos/user/AuthResponseUserDto";
import { ILockAccountUserRepositories } from "../../../domain/repositories/user/LockAccountUserRepositories";
import { ISaveUserRepositories } from "../../../domain/repositories/user/SaveUserRepositories";
import { User } from "../../../domain/entities/user/User";
import dayjs from "dayjs";

export class AuthUserUseCase {
  constructor(
    private readonly findEmailUserRepository: IFindEmailUserRepositories,
    private readonly lockAccountUserRepository: ILockAccountUserRepositories,
    private readonly compareProvider: ICompareProvider,
    private readonly saveUserRepository: ISaveUserRepositories,
    private readonly tokenProvider: ITokenProvider
  ) {}

  async execute(data: IAuthUserDTO): Promise<IAuthResponseUserDTO> {
    const userAlreadyExists = await this.findEmailUserRepository.findEmail(
      data.email
    );

    if (!userAlreadyExists) {
      throw new Error("E-mail or password incorrect!");
    }

    const lock =
      await this.lockAccountUserRepository.lockAccount(userAlreadyExists);

    if (lock) {
      throw new Error(
        "Your account has been temporarily blocked. Please try again later!"
      );
    }

    const matchPassword = await this.compareProvider.compare(
      data.password,
      userAlreadyExists.password
    );

    if (!matchPassword) {
      const attempts = userAlreadyExists.loginAttempt ?? 0;
      const countAttempts = attempts + 1;

      if (countAttempts >= 5) {
        const lockUntil = dayjs().add(30, "minute").toDate();

        const updated = User.updateLogin(userAlreadyExists, {
          loginAttempt: countAttempts,
          lockAccount: lockUntil,
        });

        await this.saveUserRepository.save(updated);

        throw new Error(
          "Your account has been blocked due to too many failed attempts. Please try again later!"
        );
      }

      const updated = User.updateLogin(userAlreadyExists, {
        loginAttempt: countAttempts,
      });

      await this.saveUserRepository.save(updated);

      throw new Error("E-mail or password incorrect!");
    }

    const updated = User.updateLogin(userAlreadyExists, {
      loginAttempt: 0,
      lockAccount: null,
    });

    await this.saveUserRepository.save(updated);

    return await this.tokenProvider.generateToken({
      id: userAlreadyExists.id as string,
      role: userAlreadyExists.role,
      name: userAlreadyExists.name,
    });
  }
}
