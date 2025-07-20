import { Request, Response } from "express";

import { FindEmailUserRepository } from "../../../infrastruture/repository/user/FindEmailUserRepository";
import { ResetTokenProvider } from "../../../shared/providers/tokens/resetToken/ResetTokenProvider";
import { SaveUserRepository } from "../../../infrastruture/repository/user/SaveUserRepository";
import { MailProvider } from "../../../shared/providers/mail/MailProvider";
import { ChangePasswordRequestUserUseCase } from "../../../application/usecases/user/ChangePasswordRequestUserUseCase";

export class ChangePasswordUserController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;

    const findEmailUserRepository = new FindEmailUserRepository();
    const resetTokenProvider = new ResetTokenProvider();
    const saveUserRepository = new SaveUserRepository();
    const mailProvider = new MailProvider();

    const useCase = new ChangePasswordRequestUserUseCase(
      findEmailUserRepository,
      resetTokenProvider,
      saveUserRepository,
      mailProvider
    );

    try {
      await useCase.execute({ email });

      return response.status(200).json({
        message:
          "If the email is correct, we will send you a link to change your password!",
      });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
