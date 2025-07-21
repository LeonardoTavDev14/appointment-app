import { Store } from "../../../domain/entities/store/Store";
import { IUpdateStoreRepositories } from "../../../domain/repositories/store/UpdateStoreRepositories";
import { prismaClient } from "../../prisma/db";

export class UpdateStoreRepository implements IUpdateStoreRepositories {
  async update(store: Store): Promise<void> {
    await prismaClient.store.update({
      where: {
        id: store.id,
      },
      data: {
        name: store.name,
        businessFone: store.businessFone,
        cep: store.cep,
        address: store.address,
        operation: store.operation,
        openingHours: store.openingHours,
        closingTime: store.closingTime,
      },
    });
  }
}
