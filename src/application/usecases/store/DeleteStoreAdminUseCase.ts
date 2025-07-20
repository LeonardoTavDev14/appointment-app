import { IFindbyIdStoreRepositories } from "../../../domain/repositories/store/FindbyIdStoreRepositories";
import { ICreateLogRepositories } from "../../../domain/repositories/log/CreateLogRepositories";
import { IDeleteStoreRepositories } from "../../../domain/repositories/store/DeleteStoreRepositories";
import { IDeleteStoreDTO } from "../../dtos/store/DeleteStoreDto";

export class DeleteStoreAdminUseCase {
  constructor(
    private readonly findByIdStoreRepository: IFindbyIdStoreRepositories,
    private readonly createLogRepository: ICreateLogRepositories,
    private readonly deleteStoreRepository: IDeleteStoreRepositories
  ) {}

  async execute(data: IDeleteStoreDTO): Promise<void> {
    const store = await this.findByIdStoreRepository.findById(data.id);

    if (!store) {
      throw new Error("Store not found!");
    }

    await this.createLogRepository.create({
      action: `DELETED_${store}_:_BY_${data.admin}`,
      details: data.details as string,
      userId: store.userId,
      admin: data.admin as string,
      observations: data.observations,
    });

    await this.deleteStoreRepository.delete(data.id);
  }
}
