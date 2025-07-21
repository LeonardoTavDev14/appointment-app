import Joi from "joi";

export const CreateUserValidator = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
  age: Joi.number().min(13).required(),
});
