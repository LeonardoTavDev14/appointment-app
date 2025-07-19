import { IFindbyIdStoreRepositories } from "../../../domain/repositories/store/FindbyIdStoreRepositories";
import { Store } from "../../../domain/entities/store/Store";
import { prismaClient } from "../../prisma/db";

export class FindByIdStoreRepository implements IFindbyIdStoreRepositories {
  async findById(id: string): Promise<Store | null> {
    const store = await prismaClient.store.findFirst({
      where: { id },
    });

    if (!store) {
      return null;
    }

    return new Store(
      store.name,
      store.businessFone,
      store.cep,
      store.address,
      store.userId,
      store.cnpj,
      store.id
    );
  }
}
