export interface ICreateServiceDTO {
  typeService: string;
  prices: number;
  observations?: string | null;
  userId: string;
}
