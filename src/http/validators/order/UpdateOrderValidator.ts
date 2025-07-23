import Joi from "joi";

export const UpdateOrderValidator = Joi.object({
  newStatus: Joi.string().required(),
});
