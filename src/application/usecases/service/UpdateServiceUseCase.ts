import { IFindServiceRepositories } from "../../../domain/repositories/service/FindServiceRepositories";
import { IFindUserIdStoreRepositories } from "../../../domain/repositories/store/FindUserIdStoreRepositories";
import { IUpdateServiceRepositories } from "../../../domain/repositories/service/UpdateServiceRepositories";
import { IUpdateServiceDTO } from "../../dtos/service/UpdateServiceDto";
import { Service } from "../../../domain/entities/service/Service";

export class UpdateServiceUseCase {
  constructor(
    private readonly findServiceRepository: IFindServiceRepositories,
    private readonly findUserIdStoreRepository: IFindUserIdStoreRepositories,
    private readonly updateServiceRepository: IUpdateServiceRepositories
  ) {}

  async execute(data: IUpdateServiceDTO): Promise<void> {
    const service = await this.findServiceRepository.find(data.id);

    if (!service) {
      throw new Error("Service not found!");
    }

    const store = await this.findUserIdStoreRepository.find(data.userId);

    if (!store) {
      throw new Error("Store not found!");
    }

    if (store.id !== service.storeId) {
      throw new Error(
        "It is not possible to edit the services of another store other than yours!"
      );
    }

    const updated = Service.updateService(service, {
      typeService: data.typeService,
      prices: data.prices,
      observations: data.observations,
    });

    await this.updateServiceRepository.update(updated);
  }
}
