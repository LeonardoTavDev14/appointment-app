import { Request, Response } from "express";

import { FindEmailUserRepository } from "../../../infrastruture/repository/user/FindEmailUserRepository";
import { HashProvider } from "../../../shared/providers/bcrypt/hash/HashProvider";
import { CreateUserRepository } from "../../../infrastruture/repository/user/CreateUserRepository";
import { CreateUserSendProvider } from "../../../shared/providers/mail/create-user/CreateUserSendProvider";

import { CreateUserUseCase } from "../../../application/usecases/user/CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, age } = request.body;

    const findEmailUserRepository = new FindEmailUserRepository();
    const hashProvider = new HashProvider();
    const createUserSendProvider = new CreateUserSendProvider();
    const createUserRepository = new CreateUserRepository();

    const useCase = new CreateUserUseCase(
      findEmailUserRepository,
      hashProvider,
      createUserSendProvider,
      createUserRepository
    );

    try {
      const user = await useCase.execute({ name, email, password, age });

      return response.status(201).json({ user });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
