const async = require("async");

const Product = require("../../models/product/Product");

module.exports = (req, res) => {
  let totalPrice = 0;
  if (!req.session.basket)
    req.session.basket = [];

  async.times(
    req.session.basket.length,
    (time, next) => {
      Product.findById(req.session.basket[time].id, (err, returnedProduct) => {
        totalPrice += parseFloat(returnedProduct.price) * parseFloat(req.session.basket[time].number)
        returnedProduct.number = req.session.basket[time].number;
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
        products,
        totalPrice
      });
    }
  );
}
