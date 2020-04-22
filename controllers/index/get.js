const async = require('async');

const Product = require("../../models/product/Product");

module.exports = (req, res) => {
  if (!req.query.category)
    req.query.category = "Tüm Ürünler";

  if (!req.query.keywords)
    req.query.keywords = null;

  Product.getLatest({
    "category": req.query.category,
    "keywords": req.query.keywords
  }, (err, latestProducts) => {
    if (err) return console.log(err);
  
    async.times(
      latestProducts.length,
      (time, next) => {
        Product.findById(latestProducts[time], (err, returnedProduct) => {
          next(err, returnedProduct);
        });
      },
      (err, products) => {
        if (err) return console.log(err);
    
        Product.find({
          onWindow: true
        }, (err, windowProducts) => {
          if (err) return console.log(err);

          return res.render('index/index', {
            page: 'index/index',
            title: 'Ana Sayfa',
            includes: {
              external: ['js', 'css', 'fontawesome']
            },
            user: req.session.user || undefined,
            products,
            windowProducts,
            category: req.query.category,
            keywords: req.query.keywords,
            basket: req.session.basket || [],
            currency: 7
          });
        });
      }
    );
  });
};
