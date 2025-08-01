import { IFindStoreRepositories } from "../../../domain/repositories/store/FindStoreRepositories";
import { IStoreVisibleDTO } from "../../../domain/repositories/store/FindStoresRepositories";
import { prismaClient } from "../../prisma/db";

export class FindStoreRepository implements IFindStoreRepositories {
  async find(id: string): Promise<IStoreVisibleDTO | null> {
    const store = await prismaClient.store.findFirst({
      where: { id },
      select: {
        name: true,
        businessFone: true,
        cep: true,
        address: true,
        operation: true,
        openingHours: true,
        closingTime: true,
      },
    });

    if (!store) {
      return null;
    }

    return store;
  }
}
