import Joi from "joi";

const regexTime = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const StoreValidator = Joi.object({
  name: Joi.string().required(),
  businessFone: Joi.string().max(18).required(),
  cep: Joi.string().max(9).required(),
  address: Joi.string().required(),
  openingHours: Joi.string().pattern(regexTime).required().messages({
    error: "Opening hours must be in HH:mm format! (ex: 08:00)",
  }),
  closingTime: Joi.string().pattern(regexTime).required().messages({
    error: "Closing time must be in HH:mm format! (ex: 21:00)",
  }),
  cnpj: Joi.string().max(18),
});
