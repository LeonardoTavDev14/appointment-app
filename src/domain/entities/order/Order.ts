export type orderStatus = "PEDDING" | "APPROVED" | "DENIED";

export class Order {
  public id?: string;
  public description: string;
  public fone: string;
  public observations?: string | null;
  public status: orderStatus;
  public userId: string;

  constructor(
    description: string,
    fone: string,
    status: orderStatus,
    userId: string,
    observations?: string | null,
    id?: string
  ) {
    this.description = description;
    this.fone = fone;
    this.status = status;
    this.userId = userId;

    if (observations !== undefined) this.observations = observations;
    if (id) this.id = id;
  }
}
