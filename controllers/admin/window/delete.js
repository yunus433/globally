const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');

module.exports = (req, res) => {
  Product.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
    onWindow: false
  }}, {}, (err, product) => {
    if (err) return res.redirect('/admin');

    return res.redirect('/admin/window');
  });
}
