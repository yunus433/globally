const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');
const Category = require('../../../models/category/Category');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  if (!req.body || !req.body.name || !req.body.type || !req.body.category || !req.body.keywords || !req.body.description || !req.body.price)
    return res.redirect('/');

  Product.findById(mongoose.Types.ObjectId(req.query.id), (err, product) => {
    if (err) return res.redirect('/admin');

    // Category.findByIdAndUpdate(mongoose.Types.ObjectId(product.category), {$pull: {
    //   products: product._id.toString()
    // }}, {}, err => {
    //   if (err) return res.redirect('/admin');

      Category.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.category), {$push: {
        products: product._id.toString()
      }}, {}, (err, category) => {
        if (err) return res.redirect('/admin');
    
        Product.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
          name: req.body.name,
          type: req.body.type,
          category: category._id,
          generalCategory: category.category,
          keywords: req.body.keywords,
          description: req.body.description,
          price: req.body.price,
          isDolar: (req.body.isDolar ? true : false),
          onSale: req.body.onSale ? true : false,
          saleAmount: req.body.onSale ? req.body.saleAmount : "",
          salePrice: req.body.onSale ? ((Math.round(parseInt(req.body.price) * (100 - parseInt(req.body.saleAmount)) / 10 )) / 10).toString().replace('.', ',') : ""
        }}, {upsert: true}, (err, product) => {
          if (err) return res.redirect('/');
      
          return res.redirect(`/admin/details?id=${product._id}`);
        });
      });
    // });
  });
}
