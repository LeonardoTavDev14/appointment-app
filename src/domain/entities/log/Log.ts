export class Log {
  public id?: string;
  public action: string;
  public details: string;
  public orderId: string;
  public userId: string;
  public admin: string;
  public observations?: string | null;

  constructor(
    action: string,
    details: string,
    orderId: string,
    userId: string,
    admin: string,
    observations?: string | null,
    id?: string
  ) {
    this.action = action;
    this.details = details;
    this.orderId = orderId;
    this.userId = userId;
    this.admin = admin;

    if (id) this.id = id;
    if (observations !== undefined) this.observations = observations;
  }
}
