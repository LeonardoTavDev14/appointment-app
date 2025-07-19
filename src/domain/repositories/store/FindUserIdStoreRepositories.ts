import { Store } from "../../entities/store/Store";

export interface IFindUserIdStoreRepositories {
  find(userId: string): Promise<Store | null>;
}
