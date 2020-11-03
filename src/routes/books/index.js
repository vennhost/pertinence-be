const express = require('express');
const router = express.Router();
const Book = require("../../models/books");
const User = require("../../models/users");
const {
  basic,
  adminOnly,
  getToken
} = require("../../utils/auth.js");

router.get('/', async (req, res) => {

  try {

    const mySort = { createdAt: -1 }
    const books = await Book.find({}).sort(mySort)
    res.send(books)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

router.get('/:id', async (req, res) => {

  try {
    const book = await (await Book.findById(req.params.id));
    res.send(book)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});





router.post("/", async (req, res) => {
  try {

    let book = new Book({
      ...req.body
    });

    await book.save();
      console.log(req.body)
    await User.findByIdAndUpdate(req.body.user._id, {
      $push: {
        books: book._id
      }
    })


    book = await Book.findById(book._id).populate("User");
    res.send(book);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});



module.exports = router;