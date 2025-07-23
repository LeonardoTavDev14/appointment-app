import Joi from "joi";

export const CreateLogValidator = Joi.object({
  details: Joi.string().max(255).required(),
  observations: Joi.string().max(155),
});
