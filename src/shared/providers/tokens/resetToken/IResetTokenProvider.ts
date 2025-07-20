export interface IResetTokenProvider {
  generateToken(): Promise<string>;
}
