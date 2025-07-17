import { User } from "../../entities/user/User";

export interface IUpdateUserRepositories {
  update(user: User): Promise<void>;
}
