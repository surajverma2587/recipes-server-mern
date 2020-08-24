const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: "",
  },
  href: {
    type: String,
    default: "",
    unique: true,
  },
  ingredients: [String],
});

const Recipe = mongoose.model("Recipe", schema);

module.exports = Recipe;
