export type userRoles = "ADMIN" | "USER" | "BARBER";

export class User {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  public age: number;
  public role: userRoles;
  public resetToken?: string | null;
  public resetExpiredToken?: Date | null;

  constructor(
    name: string,
    email: string,
    password: string,
    age: number,
    role: userRoles,
    id?: string,
    resetToken?: string | null,
    resetExpiredToken?: Date | null
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
    this.role = role;

    if (id) this.id = id;
    if (resetToken !== undefined) this.resetToken = resetToken;
    if (resetExpiredToken !== undefined)
      this.resetExpiredToken = resetExpiredToken;
  }

  static updateForm(existing: User, updates: Partial<User>): User {
    return new User(
      updates.name ?? existing.name,
      existing.email,
      existing.password,
      updates.age ?? existing.age,
      existing.role,
      existing.id,
      existing.resetToken,
      existing.resetExpiredToken
    );
  }

  static updatePassword(existing: User, updates: Partial<User>): User {
    return new User(
      existing.name,
      updates.email ?? existing.email,
      existing.password,
      existing.age,
      existing.role,
      existing.id,
      updates.resetToken ?? existing.resetToken,
      updates.resetExpiredToken ?? existing.resetExpiredToken
    );
  }

  static updateResetPassword(existing: User, newPasswordHash: string): User {
    return new User(
      existing.name,
      existing.email,
      newPasswordHash,
      existing.age,
      existing.role,
      existing.id,
      null,
      null
    );
  }

  static updateRole(existing: User, newRole: userRoles): User {
    return new User(
      existing.name,
      existing.email,
      existing.password,
      existing.age,
      newRole,
      existing.id,
      existing.resetToken,
      existing.resetExpiredToken
    );
  }
}
