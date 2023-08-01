const router = require("express").Router();
const { Loan, Book, User } = require('../../models')
const withAuth = require("../utils/auth"); 
//all the usual imports 

//Note: The bookRoute will handle any routes pertaining to Book information

//I've not looked over this yet 

// Controller function to get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Error fetching books' });
  }
};

// Controller function to get a single book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Error fetching book' });
  }
};
// Controller function to get a single book by name
const getBookByName = async (req, res) => {
  try {
    const { title } = req.params;
    const book = await Book.findByPk(title);
    if (!book) {
      return res.status(404).json({error: 'Book not found'});
    }
    res.json(book);
  } catch (error) {
    console.error ('Error fetchin book:', error);
    res.status(500).json({error: 'Error fetching book'});
  }
};

// Controller function to create a new book
const createBook = async (req, res) => {
  try {
    const { title, author, isbn, pages, publisher, synopsis, isPaperback } = req.body;
    const newBook = await Book.create({
      title,
      author,
      isbn,
      pages,
      publisher,
      synopsis,
      isPaperback,
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Error creating book' });
  }
};

// Controller function to update an existing book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, pages, publisher, synopsis, isPaperback } = req.body;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    const updatedBook = await book.update({
      title,
      author,
      isbn,
      pages,
      publisher,
      synopsis,
      isPaperback,
    });
    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Error updating book' });
  }
};

// Controller function to delete a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Error deleting book' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  getBookByName,
  createBook,
  updateBook,
  deleteBook,
};
