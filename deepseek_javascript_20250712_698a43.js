const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Get a single book
router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

// Add new book
router.post('/', async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.json({ message: 'Book added!', book: newBook });
});

// Update book
router.put('/:id', async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Book updated!' });
});

// Delete book
router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted!' });
});

// Ad management routes
let ads = {
  header: '<div class="ad">[HEADER AD]</div>',
  sidebar: '<div class="ad">[SIDEBAR AD]</div>',
  footer: '<div class="ad">[FOOTER AD]</div>'
};

// Get ads
router.get('/ads/all', (req, res) => {
  res.json(ads);
});

// Update ads
router.post('/ads/update', (req, res) => {
  ads = {...ads, ...req.body};
  res.json({ message: 'Ads updated!', ads });
});

module.exports = router;