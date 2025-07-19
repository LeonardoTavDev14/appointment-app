export interface ICreateStoreDTO {
  name: string;
  businessFone: string;
  cep: string;
  address: string;
  userId: string;
  cnpj?: string | null;
}
