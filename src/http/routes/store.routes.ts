import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureRole } from "../middlewares/ensureRole";

import { CreateStoreController } from "../controllers/store/CreateStoreController";
import { UpdateStoreController } from "../controllers/store/UpdateStoreController";
import { DeleteStoreUserController } from "../controllers/store/DeleteStoreUserController";
import { DeleteStoreAdminController } from "../controllers/store/DeleteStoreAdminController";

const routes = Router();

const createStoreController = new CreateStoreController();
const updateStoreController = new UpdateStoreController();
const deleteStoreUserController = new DeleteStoreUserController();
const deleteStoreAdminController = new DeleteStoreAdminController();

routes.post(
  "/created",
  ensureAuthenticated,
  ensureRole("ADMIN", "BARBER"),
  createStoreController.handle
);

routes.put(
  "/updated/:id",
  ensureAuthenticated,
  ensureRole("ADMIN", "BARBER"),
  updateStoreController.handle
);

routes.delete(
  "/deleted",
  ensureAuthenticated,
  ensureRole("ADMIN", "BARBER"),
  deleteStoreUserController.handle
);
routes.delete(
  "/deleted/:id",
  ensureAuthenticated,
  ensureRole("ADMIN"),
  deleteStoreAdminController.handle
);

export { routes as storeRoutes };
