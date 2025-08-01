import { Store } from "../../entities/store/Store";

export interface IFindbyIdStoreRepositories {
  findById(storeId: string): Promise<Store | null>;
}
