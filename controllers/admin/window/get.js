const Product = require('../../../models/product/Product');

module.exports = (req, res) => {
  Product.find({
    "onWindow": true
  }, (err, products) => {
    if (err) return res.redirect('/admin');

    return res.render('admin/window', {
      page: 'admin/window',
      title: 'Admin Vitrindekiler',
      includes: {
        external: ["css", "js", "fontawesome", "admin"]
      },
      active_nav_button: "window",
      products
    });
  });
}
