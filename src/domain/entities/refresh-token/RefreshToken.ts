export class RefreshToken {
  public id?: string;
  public expiredIn: Date;
  public userId: string;

  constructor(expiredIn: Date, userId: string, id?: string) {
    this.expiredIn = expiredIn;
    this.userId = userId;

    if (id) this.id = id;
  }
}
