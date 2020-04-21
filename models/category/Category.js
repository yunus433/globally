const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    default: ""
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
