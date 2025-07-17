import { IFindUserRepositories } from "../../../domain/repositories/user/FindUserRepositories";
import { IUpdateUserRepositories } from "../../../domain/repositories/user/UpdateUserRepositories";
import { IUpdateUserDTO } from "../../dtos/user/UpdateUserDto";
import { User } from "../../../domain/entities/user/User";

export class UpdateUserUseCase {
  constructor(
    private readonly findUserRepository: IFindUserRepositories,
    private readonly updateUserRepository: IUpdateUserRepositories
  ) {}

  async execute(data: IUpdateUserDTO): Promise<void> {
    const usersData = await this.findUserRepository.findUser(data.id);

    if (!usersData) {
      throw new Error("User not found!");
    }

    const updated = User.updateForm(usersData, {
      name: data.name,
      age: data.age,
    });

    return await this.updateUserRepository.update(updated);
  }
}
