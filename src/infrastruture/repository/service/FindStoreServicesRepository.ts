import {
  IFindStoreServiceRepositories,
  IServiceVisibleDTO,
} from "../../../domain/repositories/service/FindStoreServicesRepositories";
import { prismaClient } from "../../prisma/db";

export class FindStoreServiceRepository
  implements IFindStoreServiceRepositories
{
  async find(storeId: string): Promise<IServiceVisibleDTO[] | null> {
    const services = await prismaClient.service.findMany({
      where: { storeId },
      select: {
        typeService: true,
        prices: true,
        storeId: true,
        observations: true,
      },
    });

    if (!services) {
      return null;
    }

    return services;
  }
}
