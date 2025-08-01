import { IFindUserBarberRepositories } from "../../../domain/repositories/user/FindUserBarberRepositories";
import { IUserBarberDTO } from "../../../domain/repositories/user/FindUserBarberRepositories";
import { prismaClient } from "../../prisma/db";

export class FindUserBarberRepository implements IFindUserBarberRepositories {
  async find(id: string): Promise<IUserBarberDTO | null> {
    const userBarber = await prismaClient.user.findFirst({
      where: { id },
      select: {
        name: true,
        age: true,
      },
    });

    if (!userBarber) {
      return null;
    }

    return userBarber;
  }
}
