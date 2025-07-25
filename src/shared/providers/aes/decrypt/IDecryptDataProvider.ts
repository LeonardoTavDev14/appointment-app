export interface IDecryptDataProvider {
  decrypt(data: string): Promise<string>;
}
