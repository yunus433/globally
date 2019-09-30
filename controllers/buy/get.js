const async = require("async");

const Product = require("../../models/product/Product");

module.exports = (req, res) => {
  let price = 0;
  if (!req.session.basket)
    return res.redirect("/");

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
          price: returnedProduct.price,
          category: returnedProduct.category,
          _id: returnedProduct._id,
          number: req.session.basket[time].number
        });
      });
    },
    (err, products) => {
      if (err) return res.redirect("/");
      products.forEach(product => {
        price += parseFloat(product.price) * parseFloat(product.number);
      });
  
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
