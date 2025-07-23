import Joi from "joi";

export const ChangePasswordUserValidator = Joi.object({
  email: Joi.string().email().required(),
});
