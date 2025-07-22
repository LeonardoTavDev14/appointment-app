import { IFindOrderUserIdRepositories } from "../../../domain/repositories/order/FindOrderUserIdRepositories";
import { IFindUserRepositories } from "../../../domain/repositories/user/FindUserRepositories";
import { IUpdateRoleUserRepositories } from "../../../domain/repositories/user/UpdateRoleUserRepositories";
import { IUpdateRoleUserDTO } from "../../dtos/user/UpdateRoleUserDto";
import { User } from "../../../domain/entities/user/User";

export class UpdateRoleUserUseCase {
  constructor(
    private readonly findUserRepository: IFindUserRepositories,
    private readonly findOrderUserIdRepository: IFindOrderUserIdRepositories,
    private readonly updateRoleUserRepository: IUpdateRoleUserRepositories
  ) {}

  async execute(data: IUpdateRoleUserDTO): Promise<void> {
    const user = await this.findUserRepository.findUser(data.id);

    if (!user) {
      throw new Error("User not found!");
    }

    const order = await this.findOrderUserIdRepository.findOrder(
      user.id as string
    );

    if (!order || order.status !== "APPROVED") {
      throw new Error(
        "Order not found or it is not possible to change user permissions without request approval!"
      );
    }

    if (user.role === data.newRole) {
      throw new Error("It is not possible to change to the same permission!");
    }

    if (data.newRole === "ADMIN") {
      throw new Error(
        "It is not possible to change user permission to admin through a request!"
      );
    }

    const updated = User.updateRole(user, data.newRole);

    await this.updateRoleUserRepository.updateRole(updated);
  }
}
