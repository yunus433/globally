const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');

module.exports = (req, res) => {
  Product.findByIdAndDelete(mongoose.Types.ObjectId(req.query.id), (err, product) => {
    if (err) return res.redirect('/');

    return res.redirect('/admin/products');
  });
};
