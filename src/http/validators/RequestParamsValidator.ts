import Joi from "joi";
import { ObjectId } from "mongodb";

export const RequestParamsValidator = Joi.object({
  id: Joi.string()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("400");
      }
      return value;
    })
    .required(),
});
