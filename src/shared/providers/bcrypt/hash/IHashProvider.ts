export interface IHashProvider {
  hash(data: string): Promise<string>;
}
