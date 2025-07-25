import { IEncryptDataProvider } from "./IEncryptDataProvider";
import crypto, { createCipheriv } from "crypto";
import dotenv from "dotenv";
dotenv.config();

export class EncryptDataProvider implements IEncryptDataProvider {
  async encrypt(data: string): Promise<string> {
    const AES = "aes-256-cbc";
    const KEY = crypto.scryptSync(
      process.env.ENCRYPT_SECRET as string,
      "salt",
      32
    );
    const IV = crypto.randomBytes(16);

    const cipher = createCipheriv(AES, KEY, IV);
    const encrypted = Buffer.concat([
      cipher.update(data, "utf8"),
      cipher.final(),
    ]);

    return IV.toString("hex") + ":" + encrypted.toString("hex");
  }
}
