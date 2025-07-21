export interface ICreateStoreDTO {
  name: string;
  businessFone: string;
  cep: string;
  address: string;
  openingHours: string;
  closingTime: string;
  userId: string;
  cnpj?: string | null;
}
