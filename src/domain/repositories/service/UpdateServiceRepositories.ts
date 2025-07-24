import { Service } from "../../entities/service/Service";

export interface IUpdateServiceRepositories {
  update(service: Service): Promise<void>;
}
