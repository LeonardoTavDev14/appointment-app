export interface IUpdateServiceDTO {
  id: string;
  typeService: string;
  prices: number;
  observations?: string | null;
  userId: string;
}
