import { IFindNameCepStoreRepositories } from "../../../domain/repositories/store/FindNameCepStoreRepositories";
import { Store } from "../../../domain/entities/store/Store";
import { prismaClient } from "../../prisma/db";

export class FindNameCepStoreRepository
  implements IFindNameCepStoreRepositories
{
  async findCep(name: string, cep: string): Promise<Store | null> {
    const store = await prismaClient.store.findFirst({
      where: { name, cep },
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
