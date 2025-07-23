import Joi from "joi";

export const CreateOrderValidator = Joi.object({
  description: Joi.string().max(255).required(),
  fone: Joi.string().max(18).required(),
  observations: Joi.string().max(150),
});
