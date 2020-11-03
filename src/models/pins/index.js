const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const bookSchema = new Schema(
  {
    pins: {
      type: Array
    },
    
    book: [{ type: Schema.Types.ObjectId, ref: "Book" }]
  },
  
  { timestamps: true }
);

const pinCollection = mongoose.model("Pin", pinSchema);
module.exports = pinCollection;