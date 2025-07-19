import { ICreateLogRepositories } from "../../../domain/repositories/log/CreateLogRepositories";
import { Log } from "../../../domain/entities/log/Log";
import { prismaClient } from "../../prisma/db";

export class CreateLogRepository implements ICreateLogRepositories {
  async create(log: Log): Promise<Log> {
    const created = await prismaClient.log.create({
      data: {
        action: log.action,
        details: log.details,
        userId: log.userId,
        admin: log.admin,
        observations: log.observations,
      },
    });

    return new Log(
      created.action,
      created.details,
      created.userId,
      created.admin,
      created.observations,
      created.id
    );
  }
}
