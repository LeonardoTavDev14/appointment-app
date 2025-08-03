import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureRole } from "../middlewares/ensureRole";
import { ensureJoi } from "../middlewares/ensureJoi";

import { ServiceValidator } from "../validators/service/ServiceValidator";
import { RequestParamsValidator } from "../validators/RequestParamsValidator";

import { CreateServiceController } from "../controllers/service/CreateServiceController";
import { UpdateServiceController } from "../controllers/service/UpdateServiceController";
import { DeleteServiceController } from "../controllers/service/DeleteServiceController";
import { CreateLogValidator } from "../validators/log/CreateLogValidator";

const routes = Router();

const createServiceController = new CreateServiceController();
const updateServiceController = new UpdateServiceController();
const deleteServiceController = new DeleteServiceController();

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

routes.delete(
  "/deleted/:id",
  ensureAuthenticated,
  ensureRole("BARBER", "ADMIN"),
  ensureJoi(RequestParamsValidator, "params"),
  ensureJoi(CreateLogValidator, "body"),
  deleteServiceController.handle
);

export { routes as serviceRoutes };
