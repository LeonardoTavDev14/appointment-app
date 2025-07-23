import { Request, Response, NextFunction } from "express";

import dayjs from "dayjs";
import { StoreValidator } from "../validators/store/StoreValidator";

export const ensureStore = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { error, value } = StoreValidator.validate(request.body, {
    abortEarly: false,
  });

  if (error) {
    return response.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }

  const openingStore = dayjs(value.openingHours, "HH:mm");
  const closingStore = dayjs(value.closingTime, "HH:mm");

  if (!openingStore.isValid || !closingStore.isValid) {
    return response.status(400).json({
      message: "Format invalid (09:00) : (21:00)",
    });
  }

  if (openingStore.isAfter(closingStore) || openingStore.isSame(closingStore)) {
    return response.status(400).json({
      message: "Opening time must be before closing time!",
    });
  }

  return next();
};
