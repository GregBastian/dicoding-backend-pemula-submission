const Joi = require('joi');
const { nameRequiredSchemaMessage, readPageValueInvalidSchemaMessage } = require('./constants');

const nameAndReadPageSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': nameRequiredSchemaMessage }),
  readPage: Joi.number().integer().max(Joi.ref('pageCount')).required()
    .messages({ 'number.max': readPageValueInvalidSchemaMessage }),
}).unknown();

module.exports = { nameAndReadPageSchema };
