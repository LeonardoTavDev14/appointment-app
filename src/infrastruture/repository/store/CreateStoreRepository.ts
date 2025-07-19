import { ICreateStoreRepositories } from "../../../domain/repositories/store/CreateStoreRepositories";
import { Store } from "../../../domain/entities/store/Store";
import { prismaClient } from "../../prisma/db";

export class CreateStoreRepository implements ICreateStoreRepositories {
  async create(store: Store): Promise<Store> {
    const created = await prismaClient.store.create({
      data: {
        name: store.name,
        businessFone: store.businessFone,
        cep: store.cep,
        address: store.address,
        userId: store.userId,
        cnpj: store.cnpj,
      },
    });

    return new Store(
      created.name,
      created.businessFone,
      created.cep,
      created.address,
      created.userId,
      created.cnpj,
      created.id
    );
  }
}
