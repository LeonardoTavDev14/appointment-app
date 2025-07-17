export interface ICompareProvider {
  compare(data: string, hashed: string): Promise<boolean>;
}
