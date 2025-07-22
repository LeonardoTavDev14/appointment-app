import {
  IFindStoresRepositories,
  IStoreVisibleDTO,
} from "../../../domain/repositories/store/FindStoresRepositories";
import { prismaClient } from "../../prisma/db";

export class FindStoresRepository implements IFindStoresRepositories {
  async findMany(): Promise<IStoreVisibleDTO[] | null> {
    const stores = await prismaClient.store.findMany({
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

    if (!stores.length) {
      return null;
    }

    return stores;
  }
}
