import { operationStatus } from "../../entities/store/Store";
import { IStoreVisibleDTO } from "./FindStoresRepositories";

export interface IFindStoresOpenRepositories {
  findOpen(): Promise<IStoreVisibleDTO[] | null>;
}
