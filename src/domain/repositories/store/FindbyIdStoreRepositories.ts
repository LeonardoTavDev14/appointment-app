import { Store } from "../../entities/store/Store";

export interface IFindbyIdStoreRepositories {
  findById(id: string): Promise<Store | null>;
}
