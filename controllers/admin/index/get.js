const async = require('async');
const mongoose = require('mongoose');

const Order = require('../../../models/order/Order');
const Product = require('../../../models/product/Product');

module.exports = (req, res) => {
  Order
    .find({})
    .sort({'index': 1})
    .then(orders => {

      return res.render('admin/index', {
        page: 'admin/index',
        title: 'Admin Ana Sayfa',
        includes: {
          external: ['css', 'js', 'fontawesome', 'admin']
        },
        active_nav_button: 'orders',
        orders
      });
    })
    .catch(err => {
      if (err) return res.redirect('/');
    });
};
