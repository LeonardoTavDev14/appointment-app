import { ICompareProvider } from "./ICompareProvider";
import { compare } from "bcryptjs";

export class CompareProvider implements ICompareProvider {
  async compare(data: string, hashed: string): Promise<boolean> {
    return await compare(data, hashed);
  }
}
