const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const bookSchema = new Schema(
  {
    title: {
      type: String
    },
    
    author: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  
  { timestamps: true }
);

const bookCollection = mongoose.model("Book", bookSchema);
module.exports = bookCollection;