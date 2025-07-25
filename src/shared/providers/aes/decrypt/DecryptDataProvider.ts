import { IDecryptDataProvider } from "./IDecryptDataProvider";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

export class DecryptDataProvider implements IDecryptDataProvider {
  async decrypt(data: string): Promise<string> {
    const AES = "aes-256-cbc";
    const KEY = crypto.scryptSync(
      process.env.ENCRYPT_SECRET as string,
      "salt",
      32
    );

    const [ivHex, encryptHex] = data.split(":");
    const ivBuffer = Buffer.from(ivHex, "hex");
    const encryptBuffer = Buffer.from(encryptHex, "hex");

    const decipher = crypto.createDecipheriv(AES, KEY, ivBuffer);
    const decrypt = Buffer.concat([
      decipher.update(encryptBuffer),
      decipher.final(),
    ]);

    return decrypt.toString("utf8");
  }
}
