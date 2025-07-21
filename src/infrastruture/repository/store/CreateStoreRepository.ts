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
        operation: store.operation,
        openingHours: store.openingHours,
        closingTime: store.closingTime,
        userId: store.userId,
        cnpj: store.cnpj,
      },
    });

    return new Store(
      created.name,
      created.businessFone,
      created.cep,
      created.address,
      created.operation,
      created.openingHours,
      created.closingTime,
      created.userId,
      created.cnpj,
      created.id
    );
  }
}
