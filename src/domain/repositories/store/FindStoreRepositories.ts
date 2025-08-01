import { IStoreVisibleDTO } from "./FindStoresRepositories";

export interface IFindStoreRepositories {
  find(id: string): Promise<IStoreVisibleDTO | null>;
}
