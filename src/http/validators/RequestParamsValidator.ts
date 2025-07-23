import Joi from "joi";

export const RequestParamsValidator = Joi.object({
  id: Joi.string().required(),
});
