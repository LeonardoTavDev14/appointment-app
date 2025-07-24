export interface IServiceVisibleDTO {
  typeService: string;
  prices: number;
  storeId: string;
  observations?: string | null;
}

export interface IFindStoreServiceRepositories {
  find(storeId: string): Promise<IServiceVisibleDTO[] | null>;
}
