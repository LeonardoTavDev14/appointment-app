import { User } from "../../entities/user/User";

export interface IFindUserRepositories {
  findUser(id: string): Promise<User | null>;
}
