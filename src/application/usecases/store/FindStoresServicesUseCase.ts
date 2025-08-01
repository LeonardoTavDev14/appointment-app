import { IFindStoreRepositories } from "../../../domain/repositories/store/FindStoreRepositories";
import { IFindStoreServiceRepositories } from "../../../domain/repositories/service/FindStoreServicesRepositories";
import { IFindbyIdStoreRepositories } from "../../../domain/repositories/store/FindbyIdStoreRepositories";
import { IFindUserRepositories } from "../../../domain/repositories/user/FindUserRepositories";
import { IFindUserBarberRepositories } from "../../../domain/repositories/user/FindUserBarberRepositories";
import { IFindStoresServicesDTO } from "../../dtos/store/FindStoresServicesDto";
import { IFindStoresServicesResponseDTO } from "../../dtos/store/FindStoresServicesResponseDto";

export class FindStoresServicesUseCase {
  constructor(
    private readonly findStoreRepository: IFindStoreRepositories,
    private readonly findStoreServiceRepository: IFindStoreServiceRepositories,
    private readonly findByIdStoreRepository: IFindbyIdStoreRepositories,
    private readonly findUserRepository: IFindUserRepositories,
    private readonly findUserBarberRepository: IFindUserBarberRepositories
  ) {}

  async execute(
    data: IFindStoresServicesDTO
  ): Promise<IFindStoresServicesResponseDTO> {
    const store = await this.findStoreRepository.find(data.id);

    if (!store) {
      throw new Error("Store not found!");
    }

    const storeServices = await this.findStoreServiceRepository.find(data.id);

    // IMPLEMENTAR RETORNO COM USERBARBER - DANDO ERRO ATUALMENTE!
    if (!storeServices || !storeServices.length) {
      return { store, message: "No services found!" };
    }

    const storeInfo = await this.findByIdStoreRepository.findById(data.id);

    if (!storeInfo) {
      throw new Error("Store infos not found!");
    }

    const user = await this.findUserRepository.findUser(
      storeInfo.userId as string
    );

    if (!user) {
      throw new Error("User barber not found!");
    }

    if (user.role !== "BARBER" || storeInfo.userId !== user.id) {
      throw new Error("The store does not belong to this user!");
    }

    const userBarber = await this.findUserBarberRepository.find(user.id);

    if (!userBarber || !userBarber.name || !userBarber.age) {
      throw new Error("Unexpected error");
    }

    const services = storeServices.map((service) => ({
      typeService: service.typeService,
      prices: service.prices,
      storeId: service.storeId,
      observations: service.observations,
    }));

    return { store, services, userBarber };
  }
}
