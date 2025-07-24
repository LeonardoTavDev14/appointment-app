import Joi from "joi";

export const ServiceValidator = Joi.object({
  typeService: Joi.string().min(5).max(50).required(),
  prices: Joi.number().min(0).required(),
  observations: Joi.string().max(155),
});
