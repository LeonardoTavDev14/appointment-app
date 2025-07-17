import { IFindUserRepositories } from "../../../domain/repositories/user/FindUserRepositories";
import { IDeleteUserRepositories } from "../../../domain/repositories/user/DeleteUserRepositories";

export class DeleteUserUseCase {
  constructor(
    private readonly findUserRepository: IFindUserRepositories,
    private deleteUserRepository: IDeleteUserRepositories
  ) {}

  async execute(id: string): Promise<void> {
    const userData = await this.findUserRepository.findUser(id);

    if (!userData) {
      throw new Error("User not found!");
    }

    await this.deleteUserRepository.delete(id);
  }
}
