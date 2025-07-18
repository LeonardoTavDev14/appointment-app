import { Log } from "../../entities/log/Log";

export interface ICreateLogRepositories {
  create(log: Log): Promise<Log>;
}
