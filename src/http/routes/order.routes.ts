import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateOrderController } from "../controllers/order/CreateOrderController";

const routes = Router();

const createOrderController = new CreateOrderController();

routes.post("/created", ensureAuthenticated, createOrderController.handle);

export { routes as orderRoutes };
