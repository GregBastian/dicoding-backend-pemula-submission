const { addBook, getBook } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books/{bookIdParam?}',
    handler: getBook,
  },
];

module.exports = routes;
