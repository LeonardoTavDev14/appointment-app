import { Router } from "express";

import { ensureRole } from "../middlewares/ensureRole";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateUserController } from "../controllers/user/CreateUserController";
import { AuthUserController } from "../controllers/user/AuthUserController";
import { FindManyUsersController } from "../controllers/user/FindManyUsersController";
import { UpdateUserController } from "../controllers/user/UpdateUserController";
import { DeleteUserController } from "../controllers/user/DeleteUserController";

const routes = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const findManyUsersController = new FindManyUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

routes.post("/created", createUserController.handle);
routes.post("/login", authUserController.handle);

routes.get(
  "/findmany",
  ensureAuthenticated,
  ensureRole("ADMIN"),
  findManyUsersController.handle
);

routes.put("/updated", ensureAuthenticated, updateUserController.handle);

routes.delete("/deleted", ensureAuthenticated, deleteUserController.handle);

export { routes as userRoutes };
