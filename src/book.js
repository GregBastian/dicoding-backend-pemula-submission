const { nanoid } = require('nanoid');

class Book {
  constructor(entry) {
    this.id = nanoid(10);
    this.name = entry.name;
    this.year = entry.year;
    this.author = entry.author;
    this.summary = entry.summary;
    this.publisher = entry.publisher;
    this.pageCount = entry.pageCount;
    this.readPage = entry.readPage;
    this.finished = false;
    this.reading = entry.reading;

    const currentTime = new Date().toISOString();
    this.insertedAt = currentTime;
    this.updatedAt = currentTime;
  }

  static updateBook(entry) {
    return new Book(entry, { updatedAt: 1 });
  }

  getIdNameAndPublisher() {
    return { id: this.id, name: this.name, publisher: this.publisher };
  }
}

module.exports = Book;
