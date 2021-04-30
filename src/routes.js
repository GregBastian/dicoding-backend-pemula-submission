const { addBook, getBook, changeBook } = require('./handler');

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
  {
    method: 'PUT',
    path: '/books/{bookIdParam?}',
    handler: changeBook,
  },
];

module.exports = routes;
