import { Store } from "../../entities/store/Store";

export interface IUpdateStoreRepositories {
  update(store: Store): Promise<void>;
}
