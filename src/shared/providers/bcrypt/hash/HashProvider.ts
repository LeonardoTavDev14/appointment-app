import { IHashProvider } from "./IHashProvider";
import { hash } from "bcryptjs";

export class HashProvider implements IHashProvider {
  async hash(data: string): Promise<string> {
    return await hash(data, 12);
  }
}
