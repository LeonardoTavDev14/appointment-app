export interface ICreateUserSendProvider {
  send(name: string, email: string): Promise<void>;
}
