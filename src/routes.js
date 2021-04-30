const {
  postBook, getBook, putBook, deleteBook,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: postBook,
  },
  {
    method: 'GET',
    path: '/books/{bookIdParam?}',
    handler: getBook,
  },
  {
    method: 'PUT',
    path: '/books/{bookIdParam}',
    handler: putBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookIdParam}',
    handler: deleteBook,
  },
];

module.exports = routes;
