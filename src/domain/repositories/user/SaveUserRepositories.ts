import { User } from "../../entities/user/User";

export interface ISaveUserRepositories {
  save(user: User): Promise<void>;
}
