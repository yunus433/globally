const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  productList: {
    required: true,
    type: Array
  },
  createdAt: {
    type: Number,
    default: Date.now()
  },
  totalPrice: {
    required: true,
    type: Number
  },
  name: {
    type: String,
    required: true
  },
  surName: {
    type: String,
    required: true
  },
  securityNumber: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  town: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  shippingOption: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Order', OrderSchema);
