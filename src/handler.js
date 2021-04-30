const Book = require('./book');
const { successResponse, failResponse, errorResponse } = require('./response-template');
const storage = require('./storage');

const postBook = (request, h) => {
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
    return h.response(successResponse({ responseMessage: 'Buku berhasil ditambahkan', responseData: { bookId: newBook.id } }))
      .code(201);
  } catch (error) {
    const message = 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
    return h.response(errorResponse(message))
      .code(500);
  }
};

const getBook = (request, h) => {
  const { bookIdParam } = request.params;
  const bookById = storage.get(bookIdParam);
  if (bookIdParam !== undefined) {
    if (bookById === undefined) {
      const message = 'Buku tidak ditemukan';
      return h.response(failResponse({ responseMessage: message }))
        .code(404);
    }
    return h.response(successResponse({ responseData: { book: bookById } }))
      .code(200);
  }

  const { name, reading, finished } = request.query;
  const allBooks = [...storage.values()];

  if (name !== undefined) {
    const allBooksByName = allBooks.filter((entry) => entry.name.toLowerCase().includes(name));
  }

  const allBooksResponse = {
    books: allBooks
      .map((bookEntry) => bookEntry.getIdNameAndPublisher()),
  };

  return h.response(successResponse({ responseData: allBooksResponse }))
    .code(200);
};

const putBook = (request, h) => {
  const { payload } = request;
  const { bookIdParam } = request.params;
  const searchedBook = storage.get(bookIdParam);

  if (payload.name === undefined) {
    const message = 'Gagal memperbarui buku. Mohon isi nama buku';
    return h.response(failResponse({ responseMessage: message, withData: false }))
      .code(400);
  }

  if (payload.readPage > payload.pageCount) {
    const message = 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount';
    return h.response(failResponse({ responseMessage: message, withData: false }))
      .code(400);
  }

  if (searchedBook === undefined) {
    const message = 'Gagal memperbarui buku. Id tidak ditemukan';
    return h.response(failResponse({ responseMessage: message, withData: false }))
      .code(404);
  }

  searchedBook.updateBook(payload);
  return h.response(successResponse({ responseMessage: 'Buku berhasil diperbarui' }))
    .code(200);
};

const deleteBook = (request, h) => {
  const { bookIdParam } = request.params;
  const searchedBook = storage.get(bookIdParam);
  if (searchedBook === undefined) {
    const message = 'Buku gagal dihapus. Id tidak ditemukan';
    return h.response(failResponse({ responseMessage: message, withData: false }))
      .code(404);
  }

  storage.delete(bookIdParam);
  return h.response(successResponse({ responseMessage: 'Buku berhasil dihapus' }))
    .code(200);
};

module.exports = {
  postBook, getBook, putBook, deleteBook,
};
