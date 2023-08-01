// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/bookstore'; 

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  const con=mongoose.Connection

app.use(bodyParser.json());

// Create a new book
app.post('/api/books', (req, res) => {
  const { name, img, summary } = req.body;
  const newBook = new Book({ name, img, summary });

  newBook.save()
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error creating book' });
    });
});

// Get all books
app.get('/api/books', (req, res) => {
  Book.find()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error retrieving books' });
    });
});

// Get a single book by ID
app.get('/api/books/:id', (req, res) => {
  const bookId = req.params.id;

  Book.findById(bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error retrieving book' });
    });
});

// Update a book by ID
app.put('/api/books/:id', (req, res) => {
  const bookId = req.params.id;
  const { name, img, summary } = req.body;

  Book.findByIdAndUpdate(bookId, { name, img, summary }, { new: true })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error updating book' });
    });
});

// Delete a book by ID
app.delete('/api/books/:id', (req, res) => {
  const bookId = req.params.id;

  Book.findByIdAndDelete(bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json({ message: 'Book deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error deleting book' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
