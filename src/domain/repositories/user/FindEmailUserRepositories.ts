import { User } from "../../entities/user/User";

export interface IFindEmailUserRepositories {
  findEmail(email: string): Promise<User | null>;
}
