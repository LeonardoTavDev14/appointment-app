import { User } from "../../entities/user/User";

export interface IUpdateRoleUserRepositories {
  updateRole(user: User): Promise<void>;
}
