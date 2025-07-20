export interface IDeleteStoreRepositories {
  delete(id: string): Promise<void>;
  deletedByUser(userId: string): Promise<void>;
}
