import { IFindEmailUserRepositories } from "../../../domain/repositories/user/FindEmailUserRepositories";
import { ICompareProvider } from "../../../shared/providers/bcrypt/compare/ICompareProvider";
import { ITokenProvider } from "../../../shared/providers/tokens/jwt/ITokenProvider";
import { IAuthUserDTO } from "../../dtos/user/AuthUserDto";
import { IAuthResponseUserDTO } from "../../dtos/user/AuthResponseUserDto";
import { User } from "../../../domain/entities/user/User";

export class AuthUserUseCase {
  constructor(
    private readonly findEmailUserRepository: IFindEmailUserRepositories,
    private readonly compareProvider: ICompareProvider,
    private readonly tokenProvider: ITokenProvider
  ) {}

  async execute(data: IAuthUserDTO): Promise<IAuthResponseUserDTO> {
    const userAlreadyExists = await this.findEmailUserRepository.findEmail(
      data.email
    );

    if (!userAlreadyExists) {
      throw new Error("E-mail or password incorrect!");
    }

    const matchPassword = await this.compareProvider.compare(
      data.password,
      userAlreadyExists.password
    );

    if (!matchPassword) {
      throw new Error("E-mail or password incorrect!");
    }

    return await this.tokenProvider.generateToken({
      id: userAlreadyExists.id as string,
      role: userAlreadyExists.role,
      name: userAlreadyExists.name,
    });
  }
}
