import { Router } from "express";

// MIDDLEWARES
import { ensureRole } from "../middlewares/ensureRole";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

// IMPORT DAS CONTROLLERS
import { CreateUserController } from "../controllers/user/CreateUserController";
import { AuthUserController } from "../controllers/user/AuthUserController";
import { FindManyUsersController } from "../controllers/user/FindManyUsersController";
import { UpdateUserController } from "../controllers/user/UpdateUserController";
import { DeleteUserController } from "../controllers/user/DeleteUserController";

const routes = Router();

// INSTÂNCIAS CONTROLLERS
const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const findManyUsersController = new FindManyUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

// POST
routes.post("/created", createUserController.handle);
routes.post("/login", authUserController.handle);

// GET
routes.get(
  "/findmany",
  ensureAuthenticated,
  ensureRole("ADMIN"),
  findManyUsersController.handle
);

// PUT
routes.put("/updated", ensureAuthenticated, updateUserController.handle);

// DELETE
routes.delete("/deleted", ensureAuthenticated, deleteUserController.handle);

export { routes as userRoutes };
