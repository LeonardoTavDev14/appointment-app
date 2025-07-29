import { IStoreVisibleDTO } from "./FindStoresRepositories";

export interface IFindbyIdStoreRepositories {
  findById(id: string): Promise<IStoreVisibleDTO | null>;
}
