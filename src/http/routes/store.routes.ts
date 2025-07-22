import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureRole } from "../middlewares/ensureRole";

import { CreateStoreController } from "../controllers/store/CreateStoreController";
import { UpdateStoreController } from "../controllers/store/UpdateStoreController";
import { DeleteStoreUserController } from "../controllers/store/DeleteStoreUserController";
import { DeleteStoreAdminController } from "../controllers/store/DeleteStoreAdminController";
import { FindStoresController } from "../controllers/store/FindStoresController";
import { FindStoresOpenController } from "../controllers/store/FindStoresOpenController";

const routes = Router();

const createStoreController = new CreateStoreController();
const updateStoreController = new UpdateStoreController();
const deleteStoreUserController = new DeleteStoreUserController();
const deleteStoreAdminController = new DeleteStoreAdminController();
const findStoresController = new FindStoresController();
const findStoresOpenController = new FindStoresOpenController();

routes.post(
  "/created",
  ensureAuthenticated,
  ensureRole("ADMIN", "BARBER"),
  createStoreController.handle
);

routes.get("/findmany", ensureAuthenticated, findStoresController.handle);
routes.get("/findOpen", ensureAuthenticated, findStoresOpenController.handle);

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
