const async = require('async');

const Product = require('../../models/product/Product');
const Category = require('../../models/category/Category');

module.exports = (req, res) => {
  if (!req.query.generalCategory)
    req.query.generalCategory = null;

  if (!req.query.keywords)
    req.query.keywords = null;

  if (!req.query.category)
    req.query.category = null;

  if (!req.query.category && !req.query.generalCategory && !req.query.keywords) {
    Product.find({
      onWindow: true
    }, (err, windowProducts) => {
      if (err) return console.log(err);

      Category.find({}, (err, categories) => {
        if (err) return console.log(err);

        return res.render('index/index', {
          page: 'index/index',
          title: 'Ana Sayfa',
          includes: {
            external: ['js', 'css', 'fontawesome']
          },
          user: req.session.user || undefined,
          categories,
          windowProducts,
          category: req.query.category,
          generalCategory: req.query.generalCategory ? req.query.generalCategory : 'Tüm Ürünler',
          keywords: req.query.keywords,
          basket: req.session.basket || [],
          currency: 7
        });
      });
    });
  } else if (!req.query.category && req.query.generalCategory && !req.query.keywords) {
    Category.find({
      category: req.query.generalCategory
    }, (err, categories) => {
      if (err) return console.log(err);

      return res.render('index/index', {
        page: 'index/index',
        title: 'Ana Sayfa',
        includes: {
          external: ['js', 'css', 'fontawesome']
        },
        user: req.session.user || undefined,
        categories,
        category: req.query.category,
        generalCategory: req.query.generalCategory ? req.query.generalCategory : 'Tüm Ürünler',
        keywords: req.query.keywords,
        basket: req.session.basket || [],
        currency: 7
      });
    });
  } else {
    Product.getLatest({
      'category': req.query.category,
      'generalCategory': req.query.generalCategory,
      'keywords': req.query.keywords
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
      
          return res.render('index/index', {
            page: 'index/index',
            title: 'Ana Sayfa',
            includes: {
              external: ['js', 'css', 'fontawesome']
            },
            user: req.session.user || undefined,
            products,
            category: req.query.categoryName,
            generalCategory: req.query.generalCategory ? req.query.generalCategory : 'Tüm Ürünler',
            keywords: req.query.keywords,
            basket: req.session.basket || [],
            currency: 7
          });
        }
      );
    });
  }
};
