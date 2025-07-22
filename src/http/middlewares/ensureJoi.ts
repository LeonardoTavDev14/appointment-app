import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const ensureJoi = (
  schema: ObjectSchema,
  location: "body" | "params" | "query" = "body"
) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const result = schema.validate(request[location], { abortEarly: false });

    if (result.error) {
      return response.status(400).json({
        message: `Error detected:`,
        errors: result.error.details.map((erro) => erro.message),
      });
    }

    return next();
  };
};
