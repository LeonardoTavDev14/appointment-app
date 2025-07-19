import { Store } from "../../entities/store/Store";

export interface IFindNameCepStoreRepositories {
  findCep(name: string, cep: string): Promise<Store | null>;
}
