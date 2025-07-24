import { ICreateServiceRepositories } from "../../../domain/repositories/service/CreateServiceRepositories";
import { Service } from "../../../domain/entities/service/Service";
import { prismaClient } from "../../prisma/db";

export class CreateServiceRepository implements ICreateServiceRepositories {
  async create(service: Service): Promise<Service> {
    const created = await prismaClient.service.create({
      data: {
        typeService: service.typeService,
        prices: service.prices,
        storeId: service.storeId,
        observations: service.observations,
      },
    });

    return new Service(
      created.typeService,
      created.prices,
      created.storeId,
      created.observations,
      created.id
    );
  }
}
