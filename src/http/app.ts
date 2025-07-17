import express from "express";

import { userRoutes } from "./routes/user.routes";
import { orderRoutes } from "./routes/order.routes";

export const app = express();

app.use(express.json());
app.use("/auth/user", userRoutes);
app.use("/auth/order", orderRoutes);
