import { IFindStoresOpenRepositories } from "../../../domain/repositories/store/FindStoresOpenRepositories";
import { IStoreVisibleDTO } from "../../../domain/repositories/store/FindStoresRepositories";

export class FindStoresOpenUseCase {
  constructor(
    private readonly findStoresOpenRepository: IFindStoresOpenRepositories
  ) {}

  async execute(): Promise<IStoreVisibleDTO[]> {
    const storesOpen = await this.findStoresOpenRepository.findOpen();

    if (!storesOpen?.length || storesOpen.length === 0) {
      throw new Error("Stores Open not found!");
    }

    return storesOpen.map((store) => ({
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
