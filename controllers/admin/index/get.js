const async = require('async');
const mongoose = require('mongoose');

const Order = require('../../../models/order/Order');
const Product = require('../../../models/product/Product');

const engName = word => {
  return word.toLocaleLowerCase().split('ş').join('s').split('ı').join('i').split('ö').join('o').split('ç').join('c').split('ü').join('u').split('ğ').join('g');
}

const writeProductKeywords = (callback) => {
  Product.find({}, (err, products) => {
    async.times(
      products.length,
      (time, next) => {
        Product.findByIdAndUpdate(mongoose.Types.ObjectId(products[time]._id), {$set: {
          keywords: (engName(products[time].description).split(' ').join('+').split('\n').join('+').split('\t').join('+') + "+" + engName(products[time].name).split(' ').join('+').split('\n').join('+').split('\t').join('+')).split("+")
        }}, {}, err => {
          next(err, true);
        })
      },
      (err, success) => callback(err)
    )
  });
};

module.exports = (req, res) => {
  Order
    .find({})
    .sort({'createdAt': 1})
    .then(orders => {

      writeProductKeywords(err => {
        console.log("Result: " + err);

        return res.render('admin/index', {
          page: 'admin/index',
          title: 'Admin Ana Sayfa',
          includes: {
            external: ['css', 'js', 'fontawesome', 'admin']
          },
          active_nav_button: 'orders',
          orders
        });
      });
    })
    .catch(err => {
      if (err) return res.redirect('/');
    });
};
