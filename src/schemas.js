const Joi = require('joi');

const nameAndReadPageSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': 'BOOK_NAME_REQUIRED' }),
  readPage: Joi.number().integer().max(Joi.ref('pageCount')).required()
    .messages({ 'number.max': 'READ_PAGE_VALUE_INVALID' }),
}).unknown();

module.exports = { nameAndReadPageSchema };
