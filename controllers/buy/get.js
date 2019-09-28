const async = require("async");

const Product = require("../../models/product/Product");

module.exports = (req, res) => {
  let price = 0;
  if (!req.session.basket)
    return res.redirect("/");

  async.times(
    req.session.basket.length,
    (time, next) => {
      Product.findById(req.session.basket[time], (err, returnedProduct) => {
        next(err, returnedProduct);
      });
    },
    (err, products) => {
      if (err) return res.redirect("/");
      products.forEach(product => {
        price += parseFloat(product.price)
      });
      console.log(price);
  
      return res.render('buy/index', {
        page: 'buy/index',
        title: 'Siparişi Tamamla',
        includes: {
          external: ['js', 'css', 'fontawesome']
        },
        user: req.session.user || undefined,
        products,
        price
      });
    }
  );
}
