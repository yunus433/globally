const async = require('async');

const Product = require("../../../models/product/Product");

module.exports = (req, res) => {
  if (!req.query.category)
    req.query.category = "Tüm Ürünler";

  if (!req.query.keywords)
    req.query.keywords = null;

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
    
        return res.render("admin/products", {
          page: "admin/products",
          title: "Ürünler",
          includes: {
            external: ["css", "js", "fontawesome", "admin"]
          },
          active_nav_button: "products",
          products
        });
      }
    );
  });
};
