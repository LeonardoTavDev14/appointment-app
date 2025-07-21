import { operationStatus } from "../../../domain/entities/store/Store";

export interface IUpdateStoreDTO {
  id: string;
  name: string;
  businessFone: string;
  cep: string;
  address: string;
  newOperation: operationStatus;
  openingHours: string;
  closingTime: string;
}
