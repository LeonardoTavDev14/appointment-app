import { IFindServiceRepositories } from "../../../domain/repositories/service/FindServiceRepositories";
import { Service } from "../../../domain/entities/service/Service";
import { prismaClient } from "../../prisma/db";

export class FindServiceRepository implements IFindServiceRepositories {
  async find(id: string): Promise<Service | null> {
    const service = await prismaClient.service.findFirst({
      where: { id },
    });

    if (!service) {
      return null;
    }

    return new Service(
      service.typeService,
      service.prices,
      service.storeId,
      service.observations,
      service.id
    );
  }
}
