const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const bankDetailsSchema = Joi.object({
  bankName: Joi.string().required(),
  accountNumber: Joi.string().required(),
  routingNumber: Joi.string().required(),
  accountHolderName: Joi.string().required()
});

module.exports = {
  registerSchema,
  loginSchema,
  bankDetailsSchema
};