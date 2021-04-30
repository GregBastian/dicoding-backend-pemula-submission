const {
  postBookHandler, getBookHandler, putBookHandler, deleteBookHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: postBookHandler,
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
