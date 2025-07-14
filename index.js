const express = require('express');
const app = express();
const books = require('./books');
const users = require('./users');

app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to Bookstore API');
});

app.use('/books', books);
app.use('/user', users);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
