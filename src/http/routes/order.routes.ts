import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureRole } from "../middlewares/ensureRole";

import { CreateOrderController } from "../controllers/order/CreateOrderController";
import { FindOrdersController } from "../controllers/order/FindOrdersController";
import { UpdateOrderController } from "../controllers/order/UpdateOrderController";
import { DeleteOrderController } from "../controllers/order/DeleteOrderController";

const routes = Router();

const createOrderController = new CreateOrderController();
const findOrdersController = new FindOrdersController();
const updateOrderController = new UpdateOrderController();
const deleteOrderController = new DeleteOrderController();

routes.post("/created", ensureAuthenticated, createOrderController.handle);

routes.get(
  "/findmany",
  ensureAuthenticated,
  ensureRole("ADMIN"),
  findOrdersController.handle
);

routes.put(
  "/updated/:id",
  ensureAuthenticated,
  ensureRole("ADMIN"),
  updateOrderController.handle
);

routes.delete(
  "/deleted/:id",
  ensureAuthenticated,
  ensureRole("ADMIN"),
  deleteOrderController.handle
);

export { routes as orderRoutes };
