
const mongoose = require('mongoose');

const Product = require("../../models/product/Product");

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/');

  Product.findById(mongoose.Types.ObjectId(req.query.id), (err, product) => {
    if (err) return res.redirect('/');

    Product.find({
      "category": product.category,
      "_id": { $ne: product._id }
    }, (err, products) => {
      if (err) return res.redirect('/');

      return res.render('details/index', {
        page: 'details/index',
        title: product.name,
        includes: {
          external: ['js', 'css', 'fontawesome']
        },
        user: req.session.user || undefined,
        product,
        products,
        basket: req.session.basket || []
      });
    });
  });
}
