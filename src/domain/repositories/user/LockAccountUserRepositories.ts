import { User } from "../../entities/user/User";

export interface ILockAccountUserRepositories {
  lockAccount(user: User): Promise<boolean>;
}
