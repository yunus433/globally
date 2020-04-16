const async = require('async');

const Product = require("../../models/product/Product");

module.exports = (req, res) => {
  if (!req.query.category)
    req.query.category = "Tüm Ürünler";

  if (!req.query.keywords)
    req.query.keywords = null;

  Product.find({}, (err, products) => {
    if (err) return console.log(err);

    async.times(products.length, (time, next) => {
      Product.findByIdAndUpdate(products[time]._id, {$set: {
        "keywords": products[time].keywords.concat(products[time].name.toLocaleLowerCase().split(" "))
      }}, {new: true}, (err, product) => {
        next(err, product)
      });
    },
    (err, returned_products) => {
      console.log(err);

      Product.getLatest({
        "category": req.query.category,
        "keywords": req.query.keywords
      }, (err, latestProducts) => {
        if (err) return res.redirect("/");
    
        async.times(
          latestProducts.length,
          (time, next) => {
            Product.findById(latestProducts[time], (err, returnedProduct) => {
              next(err, returnedProduct);
            });
          },
          (err, products) => {
            if (err) return res.redirect("/");
        
            return res.render('index/index', {
              page: 'index/index',
              title: 'Ana Sayfa',
              includes: {
                external: ['js', 'css', 'fontawesome']
              },
              user: req.session.user || undefined,
              products,
              category: req.query.category,
              keywords: req.query.keywords,
              basket: req.session.basket || [],
              currency: 7
            });
          }
        );
      });
    });
  });
};
