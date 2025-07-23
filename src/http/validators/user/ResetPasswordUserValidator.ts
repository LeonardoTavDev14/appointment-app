import Joi from "joi";

export const ResetPasswordUserValidator = Joi.object({
  password: Joi.string().min(7).required(),
});
