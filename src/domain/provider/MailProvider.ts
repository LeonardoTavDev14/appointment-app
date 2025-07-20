export interface IMailProvider {
  send(name: string, email: string, resetToken: string): Promise<void>;
}
