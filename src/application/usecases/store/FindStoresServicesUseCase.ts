import { IFindbyIdStoreRepositories } from "../../../domain/repositories/store/FindbyIdStoreRepositories";
import { IFindStoreServiceRepositories } from "../../../domain/repositories/service/FindStoreServicesRepositories";
import { IFindStoresServicesDTO } from "../../dtos/store/FindStoresServicesDto";
import { IFindStoresServicesResponseDTO } from "../../dtos/store/FindStoresServicesResponseDto";
import { Service } from "../../../domain/entities/service/Service";

export class FindStoresServicesUseCase {
  constructor(
    private readonly findByIdStoreRepository: IFindbyIdStoreRepositories,
    private readonly findStoreServiceRepository: IFindStoreServiceRepositories
  ) {}

  async execute(
    data: IFindStoresServicesDTO
  ): Promise<IFindStoresServicesResponseDTO> {
    const store = await this.findByIdStoreRepository.findById(data.storeId);

    if (!store) {
      throw new Error("Store not found!");
    }

    const storeServices = await this.findStoreServiceRepository.find(
      data.storeId
    );

    if (!storeServices || !storeServices.length) {
      throw new Error("No services found!");
    }

    if (store.operation !== "OPEN") {
      throw new Error("The store is currently closed!");
    }

    const services = storeServices.map(
      (service) =>
        new Service(
          service.typeService,
          service.prices,
          service.storeId,
          service.observations
        )
    );

    return {
      store,
      services,
    };
  }
}
