import { IFindbyIdStoreRepositories } from "../../../domain/repositories/store/FindbyIdStoreRepositories";
import { IFindNameCepStoreRepositories } from "../../../domain/repositories/store/FindNameCepStoreRepositories";
import { IUpdateStoreRepositories } from "../../../domain/repositories/store/UpdateStoreRepositories";
import { IUpdateStoreDTO } from "../../dtos/store/UpdateStoreDto";
import { Store } from "../../../domain/entities/store/Store";

export class UpdateStoreUseCase {
  constructor(
    private readonly findByIdStoreRepository: IFindbyIdStoreRepositories,
    private readonly findNameCepStoreRepository: IFindNameCepStoreRepositories,
    private readonly updateStoreRepositories: IUpdateStoreRepositories
  ) {}

  async execute(data: IUpdateStoreDTO): Promise<void> {
    const store = await this.findByIdStoreRepository.findById(data.id);

    if (!store) {
      throw new Error("Store not found!");
    }

    const storeNameCep = await this.findNameCepStoreRepository.findCep(
      data.name,
      data.cep
    );

    if (storeNameCep && storeNameCep.id !== data.id) {
      throw new Error("This name and cep already exists!");
    }

    const updated = Store.updateForm(store, {
      name: data.name,
      businessFone: data.businessFone,
      cep: data.cep,
      address: data.address,
    });

    await this.updateStoreRepositories.update(updated);
  }
}
