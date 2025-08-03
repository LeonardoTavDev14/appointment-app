import { IFindServiceRepositories } from "../../../domain/repositories/service/FindServiceRepositories";
import { ICreateLogRepositories } from "../../../domain/repositories/log/CreateLogRepositories";
import { IDeleteServiceRepositories } from "../../../domain/repositories/service/DeleteServiceRepositories";
import { IDeleteServiceDTO } from "../../dtos/service/DeleteServiceDto";
import { IFindUserIdStoreRepositories } from "../../../domain/repositories/store/FindUserIdStoreRepositories";
import { IFindUserRepositories } from "../../../domain/repositories/user/FindUserRepositories";

export class DeleteServiceUseCase {
  constructor(
    private readonly findServiceRepository: IFindServiceRepositories,
    private readonly findUserRepository: IFindUserRepositories,
    private readonly findUserIdStoreRepository: IFindUserIdStoreRepositories,
    private readonly createLogRepository: ICreateLogRepositories,
    private readonly deleteServiceRepository: IDeleteServiceRepositories
  ) {}

  async execute(data: IDeleteServiceDTO): Promise<void> {
    const service = await this.findServiceRepository.find(data.id);

    if (!service) {
      throw new Error("Service not found!");
    }

    const user = await this.findUserRepository.findUser(data.userId);

    if (!user) {
      throw new Error("User not found!");
    }

    if (user.role === "USER") {
      throw new Error("Access denied, insufficient permission!");
    }

    const userStore = await this.findUserIdStoreRepository.find(
      user.id as string
    );

    if (!userStore) {
      throw new Error("User stored not found!");
    }

    if (service.storeId !== userStore.id) {
      throw new Error(
        "It is not possible to delete the service from another store"
      );
    }

    await this.createLogRepository.create({
      action: `DELETED_SERVICE_BY_${user.id}`,
      details: data.details,
      userId: user.id as string,
      admin: "",
      observations: data.observations,
    });

    await this.deleteServiceRepository.delete(data.id);
  }
}
