import { Router } from "express";

import { ensureRole } from "../middlewares/ensureRole";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureJoi } from "../middlewares/ensureJoi";

import { CreateUserValidator } from "../validators/user/CreateUserValidator";
import { AuthUserValidator } from "../validators/user/AuthUserValidator";
import { RequestParamsValidator } from "../validators/RequestParamsValidator";
import { UpdateUserValidator } from "../validators/user/UpdateUserValidator";
import { UpdateRoleUserValidator } from "../validators/user/UpdateRoleUserValidator";
import { ChangePasswordUserValidator } from "../validators/user/ChangePasswordUserValidator";
import { ResetPasswordUserValidator } from "../validators/user/ResetPasswordUserValidator";

import { CreateUserController } from "../controllers/user/CreateUserController";
import { AuthUserController } from "../controllers/user/AuthUserController";
import { FindManyUsersController } from "../controllers/user/FindManyUsersController";
import { UpdateUserController } from "../controllers/user/UpdateUserController";
import { DeleteUserController } from "../controllers/user/DeleteUserController";
import { ChangePasswordUserController } from "../controllers/user/ChangePasswordUserController";
import { ResetPasswordUserController } from "../controllers/user/ResetPasswordUserController";
import { UpdateRoleUserController } from "../controllers/user/UpdateRoleUserController";

const routes = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const findManyUsersController = new FindManyUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const changePasswordUserController = new ChangePasswordUserController();
const resetPasswordUserController = new ResetPasswordUserController();
const updateRoleUserController = new UpdateRoleUserController();

routes.post(
  "/created",
  ensureJoi(CreateUserValidator, "body"),
  createUserController.handle
);
routes.post(
  "/login",
  ensureJoi(AuthUserValidator, "body"),
  authUserController.handle
);
routes.post(
  "/forgot-password",
  ensureJoi(ChangePasswordUserValidator, "body"),
  changePasswordUserController.handle
);

routes.get(
  "/findmany",
  ensureAuthenticated,
  ensureRole("ADMIN"),
  findManyUsersController.handle
);

routes.put(
  "/updated",
  ensureAuthenticated,
  ensureJoi(UpdateUserValidator, "body"),
  updateUserController.handle
);
routes.put(
  "/reset-password/:token",
  ensureJoi(ResetPasswordUserValidator, "body"),
  resetPasswordUserController.handle
);
routes.put(
  "/updated-role/:id",
  ensureAuthenticated,
  ensureRole("ADMIN"),
  ensureJoi(RequestParamsValidator, "params"),
  ensureJoi(UpdateRoleUserValidator, "body"),
  updateRoleUserController.handle
);

routes.delete("/deleted", ensureAuthenticated, deleteUserController.handle);

export { routes as userRoutes };
