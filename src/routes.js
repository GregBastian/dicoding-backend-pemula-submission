const {
  postBookHandler, getBookHandler, putBookHandler, deleteBookHandler,
} = require('./handlers/handler');

const {
  nameAndReadPageValidationHandler,
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
        failAction: nameAndReadPageValidationHandler,
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
    config: {
      validate: {
        payload: nameAndReadPageSchema,
        failAction: nameAndReadPageValidationHandler,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/books/{bookIdParam}',
    handler: deleteBookHandler,
  },
];

module.exports = routes;
