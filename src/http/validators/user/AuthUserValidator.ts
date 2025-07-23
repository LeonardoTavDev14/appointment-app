import Joi from "joi";

export const AuthUserValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
