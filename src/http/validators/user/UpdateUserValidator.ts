import Joi from "joi";

export const UpdateUserValidator = Joi.object({
  name: Joi.string().min(3),
  age: Joi.number().min(13),
});
