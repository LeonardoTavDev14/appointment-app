import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureRole } from "../middlewares/ensureRole";

import { CreateStoreController } from "../controllers/store/CreateStoreController";
import { UpdateStoreController } from "../controllers/store/UpdateStoreController";

const routes = Router();

const createStoreController = new CreateStoreController();
const updateStoreController = new UpdateStoreController();

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

export { routes as storeRoutes };
