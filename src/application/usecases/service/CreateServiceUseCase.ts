import { IFindStoreServiceRepositories } from "../../../domain/repositories/service/FindStoreServicesRepositories";
import { ICreateServiceRepositories } from "../../../domain/repositories/service/CreateServiceRepositories";
import { IFindUserIdStoreRepositories } from "../../../domain/repositories/store/FindUserIdStoreRepositories";
import { ICreateServiceDTO } from "../../dtos/service/CreateServiceDto";
import { Service } from "../../../domain/entities/service/Service";

export class CreateServiceUseCase {
  constructor(
    private readonly findStoreServiceRepository: IFindStoreServiceRepositories,
    private readonly findUserIdStoreRepository: IFindUserIdStoreRepositories,
    private readonly createServiceRepository: ICreateServiceRepositories
  ) {}

  async execute(data: ICreateServiceDTO): Promise<Service> {
    const storeUser = await this.findUserIdStoreRepository.find(data.userId);

    if (!storeUser) {
      throw new Error("No stores found from past user!");
    }

    const services = await this.findStoreServiceRepository.find(
      storeUser.id as string
    );

    if (services!.length >= 5) {
      throw new Error("A store can only register 5 types of services!");
    }

    const service = new Service(
      data.typeService,
      data.prices,
      storeUser.id as string,
      data.observations
    );

    return await this.createServiceRepository.create(service);
  }
}
