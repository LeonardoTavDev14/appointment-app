import { IFindEmailUserRepositories } from "../../../domain/repositories/user/FindEmailUserRepositories";
import { IHashProvider } from "../../../shared/providers/bcrypt/hash/IHashProvider";
import { ICreateUserSendProvider } from "../../../shared/providers/mail/create-user/ICreateUserSendProvider";
import { ICreateUserRepositories } from "../../../domain/repositories/user/CreateUserRepositories";
import { ICreateUserDTO } from "../../dtos/user/CreateUserDto";
import { User } from "../../../domain/entities/user/User";

export class CreateUserUseCase {
  constructor(
    private readonly findEmailUserRepository: IFindEmailUserRepositories,
    private readonly hashProvider: IHashProvider,
    private readonly createUserSendProvider: ICreateUserSendProvider,
    private readonly createUserRepository: ICreateUserRepositories
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.findEmailUserRepository.findEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const hashedPassword = await this.hashProvider.hash(data.password);

    const user = new User(
      data.name,
      data.email,
      hashedPassword,
      data.age,
      "USER"
    );

    await this.createUserSendProvider.send(data.name, data.email);

    return await this.createUserRepository.create(user);
  }
}
