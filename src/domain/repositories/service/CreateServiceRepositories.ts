import { Service } from "../../entities/service/Service";

export interface ICreateServiceRepositories {
  create(service: Service): Promise<Service>;
}
