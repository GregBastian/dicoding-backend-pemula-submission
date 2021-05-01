const Joi = require('joi');
const {
  postBookHandler, getBookHandler, putBookHandler, deleteBookHandler,
} = require('./handlers/handler');

const {
  postBookValidationHandler,
} = require('./handlers/validation-handler');

const { nameAndReadPageSchema } = require('./schemas');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: postBookHandler,
    config: {
      validate: {
        payload: nameAndReadPageSchema,
        failAction: postBookValidationHandler,
      },
    },
  },
  {
    method: 'GET',
    path: '/books/{bookIdParam?}',
    handler: getBookHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookIdParam}',
    handler: putBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookIdParam}',
    handler: deleteBookHandler,
  },
];

module.exports = routes;
