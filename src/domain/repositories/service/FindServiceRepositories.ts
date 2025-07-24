import { Service } from "../../entities/service/Service";

export interface IFindServiceRepositories {
  find(id: string): Promise<Service | null>;
}
