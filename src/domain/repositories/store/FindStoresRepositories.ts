import { operationStatus } from "../../entities/store/Store";

export interface IStoreVisibleDTO {
  name: string;
  businessFone: string;
  cep: string;
  address: string;
  operation: operationStatus;
  openingHours: string;
  closingTime: string;
  cnpj?: string | null;
}

export interface IFindStoresRepositories {
  findMany(): Promise<IStoreVisibleDTO[] | null>;
}
