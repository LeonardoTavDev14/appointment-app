import { userRoles } from "../../../domain/entities/user/User";

export interface IUpdateRoleUserDTO {
  id: string;
  newRole: userRoles;
}
