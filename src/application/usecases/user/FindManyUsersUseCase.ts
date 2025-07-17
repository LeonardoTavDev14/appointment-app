import { IFindManyUsersRepositories } from "../../../domain/repositories/user/FindManyUsersRepositories";
import { User } from "../../../domain/entities/user/User";

export class FindManyUsersUseCase {
  constructor(
    private readonly findManyUsersRepository: IFindManyUsersRepositories
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.findManyUsersRepository.findMany();

    if (!users || users.length === 0) {
      throw new Error("No users found!");
    }

    return users.map(
      (user) =>
        new User(
          user.name,
          user.email,
          user.password,
          user.age,
          user.role,
          user.id,
          user.resetToken,
          user.resetExpiredToken
        )
    );
  }
}
