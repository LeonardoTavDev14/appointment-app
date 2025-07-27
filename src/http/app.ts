import express from "express";

import { userRoutes } from "./routes/user.routes";
import { orderRoutes } from "./routes/order.routes";
import { storeRoutes } from "./routes/store.routes";
import { serviceRoutes } from "./routes/service.routes";
import { refreshTokenRoutes } from "./routes/refresh-token.routes";

export const app = express();

app.use(express.json());
app.use("/auth/user", userRoutes);
app.use("/auth/order", orderRoutes);
app.use("/auth/store", storeRoutes);
app.use("/auth/service", serviceRoutes);
app.use("/auth", refreshTokenRoutes);
