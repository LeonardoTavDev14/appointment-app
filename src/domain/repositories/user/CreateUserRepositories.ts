import { User } from "../../entities/user/User";

export interface ICreateUserRepositories {
  create(user: User): Promise<User>;
}
