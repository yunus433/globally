const async = require("async");

const Product = require("../../models/product/Product");

module.exports = (req, res) => {
  if (!req.session.basket)
    req.session.basket = [
      "5d8b4ade61fa6e0854e256dc",
      "5d8b73c8f443a2087b51ba2f"
    ];

  async.times(
    req.session.basket.length,
    (time, next) => {
      Product.findById(req.session.basket[time], (err, returnedProduct) => {
        next(err, returnedProduct);
      });
    },
    (err, products) => {
      if (err) return res.redirect("/");
  
      return res.render('basket/index', {
        page: 'basket/index',
        title: 'Alışveriş Sepetim',
        includes: {
          external: ['js', 'css', 'fontawesome']
        },
        user: req.session.user || undefined,
        products
      });
    }
  );
}
