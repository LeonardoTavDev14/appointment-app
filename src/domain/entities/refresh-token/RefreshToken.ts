type userRoles = "ADMIN" | "USER" | "BARBER";

export class RefreshToken {
  public id?: string;
  public expiredIn: Date;
  public name: string;
  public roleUser: userRoles;
  public userId: string;

  constructor(
    expiredIn: Date,
    userId: string,
    name: string,
    roleUser: userRoles,
    id?: string
  ) {
    this.expiredIn = expiredIn;
    this.name = name;
    this.roleUser = roleUser;
    this.userId = userId;

    if (id) this.id = id;
  }
}
