export interface ITokenPayload {
  role: "ADMIN" | "USER" | "BARBER";
  id: string;
}

export interface ITokenProvider {
  generateToken(payloadToken: ITokenPayload): Promise<string>;
}
