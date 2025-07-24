import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureRole } from "../middlewares/ensureRole";
import { ensureJoi } from "../middlewares/ensureJoi";

import { ServiceValidator } from "../validators/service/ServiceValidator";

import { CreateServiceController } from "../controllers/service/CreateServiceController";
import { UpdateServiceController } from "../controllers/service/UpdateServiceController";
import { RequestParamsValidator } from "../validators/RequestParamsValidator";

const routes = Router();

const createServiceController = new CreateServiceController();
const updateServiceController = new UpdateServiceController();

routes.post(
  "/created",
  ensureAuthenticated,
  ensureRole("ADMIN", "BARBER"),
  ensureJoi(ServiceValidator, "body"),
  createServiceController.handle
);

routes.put(
  "/updated/:id",
  ensureAuthenticated,
  ensureRole("ADMIN", "BARBER"),
  ensureJoi(RequestParamsValidator, "params"),
  ensureJoi(ServiceValidator, "body"),
  updateServiceController.handle
);

export { routes as serviceRoutes };
