const express = require('express');
const router = express.Router();

// Sample book data
let books = {
  "1111": {
    title: "Book One",
    author: "Author A",
    reviews: {}
  },
  "2222": {
    title: "Book Two",
    author: "Author B",
    reviews: {}
  }
};

// GET all books
router.get('/', (req, res) => {
  res.json(books);
});

// GET book by ISBN
router.get('/isbn/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  book ? res.json(book) : res.status(404).send('Book not found');
});

// GET books by Author
router.get('/author/:author', (req, res) => {
  const filtered = Object.values(books).filter(b => b.author === req.params.author);
  res.json(filtered);
});

// GET books by Title
router.get('/title/:title', (req, res) => {
  const filtered = Object.values(books).filter(b => b.title === req.params.title);
  res.json(filtered);
});

// GET book reviews
router.get('/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  book ? res.json(book.reviews) : res.status(404).send('Book not found');
});

// ADD or MODIFY a review (requires username query param)
router.put('/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const user = req.query.user;

  if (!user || !review) {
    return res.status(400).send('Username and review are required');
  }

  if (!books[isbn]) return res.status(404).send('Book not found');

  books[isbn].reviews[user] = review;
  res.send(`Review added/updated by ${user}`);
});

// DELETE a review (requires username query param)
router.delete('/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  const user = req.query.user;

  if (!user) return res.status(400).send('Username is required');

  if (!books[isbn] || !books[isbn].reviews[user]) {
    return res.status(404).send('Review not found');
  }

  delete books[isbn].reviews[user];
  res.send(`Review by ${user} deleted`);
});

module.exports = router;
