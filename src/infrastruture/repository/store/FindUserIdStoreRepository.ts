import { IFindUserIdStoreRepositories } from "../../../domain/repositories/store/FindUserIdStoreRepositories";
import { Store } from "../../../domain/entities/store/Store";
import { prismaClient } from "../../prisma/db";

export class FindUserIdStoreRepository implements IFindUserIdStoreRepositories {
  async find(userId: string): Promise<Store | null> {
    const userStored = await prismaClient.store.findFirst({
      where: { userId },
    });

    if (!userStored) {
      return null;
    }

    return new Store(
      userStored.name,
      userStored.businessFone,
      userStored.cep,
      userStored.address,
      userStored.userId,
      userStored.cnpj,
      userStored.id
    );
  }
}
