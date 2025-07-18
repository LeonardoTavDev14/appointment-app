export interface IDeleteOrderRepositories {
  delete(id: string): Promise<void>;
}
