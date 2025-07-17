import { User } from "../../entities/user/User";

export interface IFindManyUsersRepositories {
  findMany(): Promise<Array<User> | null>;
}
