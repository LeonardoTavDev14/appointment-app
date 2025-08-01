import { Service } from "../../../domain/entities/service/Service";
import { IStoreVisibleDTO } from "../../../domain/repositories/store/FindStoresRepositories";
import { IUserBarberDTO } from "../../../domain/repositories/user/FindUserBarberRepositories";

export interface IFindStoresServicesResponseDTO {
  store: IStoreVisibleDTO;
  services?: Service[];
  userBarber?: IUserBarberDTO;
  message?: string;
}
