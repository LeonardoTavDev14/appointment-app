import { ILockAccountUserRepositories } from "../../../domain/repositories/user/LockAccountUserRepositories";
import { User } from "../../../domain/entities/user/User";
import dayjs from "dayjs";

export class LockAccountUserRepository implements ILockAccountUserRepositories {
  async lockAccount(user: User): Promise<boolean> {
    if (!user.lockAccount) return false;

    const isBlockAccount = dayjs().isBefore(user.lockAccount);

    return isBlockAccount;
  }
}
