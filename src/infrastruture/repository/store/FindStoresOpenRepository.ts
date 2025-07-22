import { IFindStoresOpenRepositories } from "../../../domain/repositories/store/FindStoresOpenRepositories";
import { IStoreVisibleDTO } from "../../../domain/repositories/store/FindStoresRepositories";
import { prismaClient } from "../../prisma/db";

export class FindStoresOpenRepository implements IFindStoresOpenRepositories {
  async findOpen(): Promise<IStoreVisibleDTO[] | null> {
    const storesOpen = await prismaClient.store.findMany({
      where: { operation: "OPEN" },
      select: {
        name: true,
        businessFone: true,
        cep: true,
        address: true,
        operation: true,
        openingHours: true,
        closingTime: true,
        cnpj: true,
      },
    });

    if (!storesOpen.length) {
      return null;
    }

    return storesOpen;
  }
}
