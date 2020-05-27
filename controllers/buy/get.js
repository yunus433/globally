const async = require('async');
const mongoose = require('mongoose');

const Product = require('../../models/product/Product');
const User = require('../../models/user/User');

module.exports = (req, res) => {
  let price = 0;
  if (!req.session.basket)
    return res.redirect('/');

  async.times(
    req.session.basket.length,
    (time, next) => {
      Product.findById(req.session.basket[time].id, (err, returnedProduct) => {
        next(err, {
          name: returnedProduct.name,
          createdAt: returnedProduct.createdAt,
          productPhotoArray: returnedProduct.productPhotoArray,
          keywords: returnedProduct.keywords,
          description: returnedProduct.description,
          price: returnedProduct.onSale ? returnedProduct.salePrice : returnedProduct.price,
          category: returnedProduct.category,
          _id: returnedProduct._id,
          number: req.session.basket[time].number
        });
      });
    },
    (err, products) => {
      if (err) return res.redirect('/');
      products.forEach(product => {
        price += parseFloat(product.price) * parseFloat(product.number);
      });

      User.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.user._id), {$set: {
        currentPrice: price,
        currentProducts: products
      }}, {}, (err, user) => {
        if (err) return res.redirect('/');

        return res.render('buy/index', {
          page: 'buy/index',
          title: 'Siparişi Tamamla',
          includes: {
            external: ['js', 'css', 'fontawesome']
          },
          user: req.session.user || undefined,
          price
        });
      });
    }
  );
}
