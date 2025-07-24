import { IUpdateServiceRepositories } from "../../../domain/repositories/service/UpdateServiceRepositories";
import { Service } from "../../../domain/entities/service/Service";
import { prismaClient } from "../../prisma/db";

export class UpdateServiceRepository implements IUpdateServiceRepositories {
  async update(service: Service): Promise<void> {
    await prismaClient.service.update({
      where: { id: service.id },
      data: {
        typeService: service.typeService,
        prices: service.prices,
        observations: service.observations,
      },
    });
  }
}
