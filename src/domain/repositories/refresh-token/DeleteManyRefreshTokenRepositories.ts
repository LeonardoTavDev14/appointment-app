export interface IDeleteManyRefreshTokenRepositories {
  deleteMany(userId: string): Promise<void>;
}
