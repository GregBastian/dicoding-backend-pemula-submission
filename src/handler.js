const Book = require('./book');
const { successResponse, failResponse, errorResponse } = require('./response-template');
const storage = require('./storage');

const addBook = (request, h) => {
  try {
    const { payload } = request;
    if (payload.name === undefined) {
      const message = 'Gagal menambahkan buku. Mohon isi nama buku';
      return h.response(failResponse({ responseMessage: message, withData: false }))
        .code(400);
    }

    if (payload.readPage > payload.pageCount) {
      const message = 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
      return h.response(failResponse({ responseMessage: message, withData: false }))
        .code(400);
    }

    const newBook = new Book(payload);
    storage.set(newBook.id, newBook);
    return h.response(successResponse({ responseMessage: 'Buku berhasil ditambahkan', responseData: { bookId: payload.id } }))
      .code(201);
  } catch (error) {
    const message = 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
    return h.response(errorResponse(message))
      .code(500);
  }
};

const getBook = (request, h) => {
  const { bookIdParam } = request.params;
  if (bookIdParam !== undefined) {
    const bookById = storage.get(bookIdParam);
    if (bookById === undefined) {
      const message = 'Buku tidak ditemukan';
      return h.response(failResponse({ responseMessage: message }))
        .code(404);
    }
    return h.response(successResponse({ responseData: { book: bookById } }))
      .code(200);
  }

  const allBooks = { books: [...storage.values()].map((entry) => entry.getIdNameAndPublisher()) };
  return h.response(successResponse({ responseData: allBooks }))
    .code(200);
};

module.exports = { addBook, getBook };