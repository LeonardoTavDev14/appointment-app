import { IFindUserIdStoreRepositories } from "../../../domain/repositories/store/FindUserIdStoreRepositories";
import { ICreateLogRepositories } from "../../../domain/repositories/log/CreateLogRepositories";
import { IDeleteStoreRepositories } from "../../../domain/repositories/store/DeleteStoreRepositories";
import { IDeleteStoreDTO } from "../../dtos/store/DeleteStoreDto";

export class DeleteStoreUserUseCase {
  constructor(
    private readonly findUserIdStoreRepository: IFindUserIdStoreRepositories,
    private readonly createLogRepository: ICreateLogRepositories,
    private readonly deleteStoreRepository: IDeleteStoreRepositories
  ) {}

  async execute(data: IDeleteStoreDTO): Promise<void> {
    const store = await this.findUserIdStoreRepository.find(data.id);

    if (!store) {
      throw new Error("Store not found!");
    }

    await this.createLogRepository.create({
      action: `DELETED_${store}_:_BY_${store.userId}`,
      details: data.details as string,
      userId: store.userId,
      admin: (data.admin as string) || "",
      observations: data.observations,
    });

    await this.deleteStoreRepository.deletedByUser(data.id);
  }
}
