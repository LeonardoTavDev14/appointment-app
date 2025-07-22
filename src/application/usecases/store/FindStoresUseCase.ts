import {
  IFindStoresRepositories,
  IStoreVisibleDTO,
} from "../../../domain/repositories/store/FindStoresRepositories";

export class FindStoresUseCase {
  constructor(private readonly findStoresRepository: IFindStoresRepositories) {}

  async execute(): Promise<IStoreVisibleDTO[]> {
    const stores = await this.findStoresRepository.findMany();

    if (!stores?.length || stores.length === 0) {
      throw new Error("No Stores found!");
    }

    return stores.map((store) => ({
      name: store.name,
      businessFone: store.businessFone,
      cep: store.cep,
      address: store.address,
      operation: store.operation,
      openingHours: store.openingHours,
      closingTime: store.closingTime,
      cnpj: store.cnpj,
    }));
  }
}
