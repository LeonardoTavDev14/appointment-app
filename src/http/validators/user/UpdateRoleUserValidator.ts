import Joi from "joi";

export const UpdateRoleUserValidator = Joi.object({
  newRole: Joi.string().required(),
});
