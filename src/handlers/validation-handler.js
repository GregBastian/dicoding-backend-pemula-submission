const { failResponse } = require('../response-template');
const { nameRequiredSchemaMessage, readPageValueInvalidSchemaMessage } = require('../constants');

const nameAndReadPageValidationHandler = (request, h, source) => {
  const { message: schemaMessage } = source.details[0];
  let message = 'Bad Request';
  const verb = request.method === 'post' ? 'menambahkan' : 'memperbarui';

  if (schemaMessage === nameRequiredSchemaMessage) {
    message = `Gagal ${verb} buku. Mohon isi nama buku`;
  }

  if (schemaMessage === readPageValueInvalidSchemaMessage) {
    message = `Gagal ${verb} buku. readPage tidak boleh lebih besar dari pageCount`;
  }

  return h.response(failResponse({ responseMessage: message, withData: false }))
    .code(400).takeover();
};

module.exports = { nameAndReadPageValidationHandler };
