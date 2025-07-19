import { Store } from "../../entities/store/Store";

export interface ICreateStoreRepositories {
  create(store: Store): Promise<Store>;
}
