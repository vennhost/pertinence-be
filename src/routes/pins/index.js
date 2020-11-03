const express = require('express');
const router = express.Router();
const Pin = require("../../models/pins");
const Book = require("../../models/books");
var CodeGenerator = require('node-code-generator');
const {
  basic,
  adminOnly,
  getToken
} = require("../../utils/auth.js");




router.get('/', async (req, res) => {

  try {

    const mySort = { createdAt: -1 }
    const pins = await Pin.find({}).sort(mySort)
    res.send(books)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

router.get('/:id', async (req, res) => {

  try {
    const pin = await (await Pin.findById(req.params.id));
    res.send(pin)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});





router.post("/", async (req, res) => {
  try {

    var generator = new CodeGenerator();
    var pattern = 'ABC#+';
    var howMany = 100;
    var options = {};
    // Generate an array of random unique codes according to the provided pattern:
    var codes = generator.generateCodes(pattern, howMany, options);

    

    await generator.save();
      console.log(req.body)
    await Book.findByIdAndUpdate(req.body.user._id, {
      $push: {
        pins: pin._id
      }
    })


    pin = await Book.findById(book._id).populate("Book");
    res.send(pin);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});



module.exports = router;