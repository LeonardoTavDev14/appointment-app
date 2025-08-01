import { Store } from "../../../domain/entities/store/Store";
import { IFindbyIdStoreRepositories } from "../../../domain/repositories/store/FindbyIdStoreRepositories";
import { prismaClient } from "../../prisma/db";

export class FindByIdStoreRepository implements IFindbyIdStoreRepositories {
  async findById(storeId: string): Promise<Store | null> {
    const store = await prismaClient.store.findFirst({
      where: { id: storeId },
    });

    if (!store) {
      return null;
    }

    return new Store(
      store.name,
      store.businessFone,
      store.cep,
      store.address,
      store.operation,
      store.openingHours,
      store.closingTime,
      store.userId,
      store.cnpj,
      store.id
    );
  }
}
