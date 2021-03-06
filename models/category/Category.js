const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  index: {
    type: Number,
    default: 1
  },
  name: {
    type: String,
    default: "",
    unique: true
  },
  products: {
    type: Array,
    default: []
  },
  category :{
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Category', CategorySchema);
