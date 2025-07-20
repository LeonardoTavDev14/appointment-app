import { IResetTokenProvider } from "./IResetTokenProvider";
import crypto from "crypto";

export class ResetTokenProvider implements IResetTokenProvider {
  async generateToken(): Promise<string> {
    return crypto.randomBytes(32).toString("hex");
  }
}
