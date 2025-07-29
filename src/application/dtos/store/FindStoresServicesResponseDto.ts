import { Service } from "../../../domain/entities/service/Service";
import { IStoreVisibleDTO } from "../../../domain/repositories/store/FindStoresRepositories";

export interface IFindStoresServicesResponseDTO {
  store: IStoreVisibleDTO;
  services: Service[];
}
