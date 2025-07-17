export interface IDeleteUserRepositories {
  delete(id: string): Promise<void>;
}
