import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { RefreshTokenController } from "../controllers/refresh-token/RefreshTokenController";

const routes = Router();

const refreshTokenController = new RefreshTokenController();

routes.post(
  "/refresh-token",
  ensureAuthenticated,
  refreshTokenController.handle
);

export { routes as refreshTokenRoutes };
