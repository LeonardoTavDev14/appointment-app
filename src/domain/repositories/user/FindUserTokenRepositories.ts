import { User } from "../../entities/user/User";

export interface IFindUserTokenRepositories {
  findToken(token: string): Promise<User | null>;
}
