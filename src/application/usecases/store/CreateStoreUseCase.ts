import { IFindNameCepStoreRepositories } from "../../../domain/repositories/store/FindNameCepStoreRepositories";
import { ICreateStoreRepositories } from "../../../domain/repositories/store/CreateStoreRepositories";
import { ICreateStoreDTO } from "../../dtos/store/CreateStoreDto";
import { Store } from "../../../domain/entities/store/Store";
import { IFindUserIdStoreRepositories } from "../../../domain/repositories/store/FindUserIdStoreRepositories";

export class CreateStoreUseCase {
  constructor(
    private readonly findNameCepStoreRepository: IFindNameCepStoreRepositories,
    private readonly findUserIdStoreRepository: IFindUserIdStoreRepositories,
    private readonly createStoreRepository: ICreateStoreRepositories
  ) {}

  async execute(data: ICreateStoreDTO): Promise<Store> {
    const store = await this.findNameCepStoreRepository.findCep(
      data.name,
      data.cep
    );

    if (store) {
      throw new Error("Store already exists!");
    }

    const userAlreadyExists = await this.findUserIdStoreRepository.find(
      data.userId
    );

    if (userAlreadyExists) {
      throw new Error("The user can only create one store in the system.");
    }

    const created = new Store(
      data.name,
      data.businessFone,
      data.cep,
      data.address,
      data.userId,
      data.cnpj
    );

    return await this.createStoreRepository.create(created);
  }
}
