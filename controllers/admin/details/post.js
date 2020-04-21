const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');
const Category = require('../../../models/category/Category');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  if (!req.body || !req.body.name || !req.body.type || !req.body.category || !req.body.keywords || !req.body.description || !req.body.price)
    return res.redirect('/');

  Category.findById(mongoose.Types.ObjectId(req.body.category), (err, category) => {
    if (err) return res.redirect('/admin');

    Product.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
      name: req.body.name,
      type: req.body.type,
      category: category.name,
      generalCategory: category.category,
      keywords: req.body.keywords,
      description: req.body.description,
      price: req.body.price,
      isDolar: (req.body.isDolar ? true : false)
    }}, {upsert: true}, (err, product) => {
      if (err) return res.redirect('/');
  
      return res.redirect(`/admin/details?id=${product._id}`);
    });
  });
}
