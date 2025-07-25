export interface IEncryptDataProvider {
  encrypt(data: string): Promise<string>;
}
